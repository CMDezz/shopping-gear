// src/libs/middleware/rateLimit.ts
import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (req: NextRequest) => string;
}

// In-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const withRateLimit = (config: RateLimitConfig) => {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      const key = config.keyGenerator
        ? config.keyGenerator(req)
        : req.headers.get("x-forwarded-for") || "unknown";

      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Clean up old entries
      for (const [k, v] of requestCounts.entries()) {
        if (v.resetTime < windowStart) {
          requestCounts.delete(k);
        }
      }

      const current = requestCounts.get(key);

      if (!current || current.resetTime < windowStart) {
        requestCounts.set(key, { count: 1, resetTime: now });
      } else if (current.count >= config.maxRequests) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many requests",
            retryAfter: Math.ceil(
              (current.resetTime + config.windowMs - now) / 1000
            ),
          },
          {
            status: 429,
            headers: {
              "Retry-After": Math.ceil(
                (current.resetTime + config.windowMs - now) / 1000
              ).toString(),
            },
          }
        );
      } else {
        current.count++;
      }

      return handler(req);
    };
  };
};

// Predefined rate limiters
export const authRateLimit = withRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per window
  keyGenerator: (req) => `auth:${"unknown"}`,
});

export const apiRateLimit = withRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  keyGenerator: (req) => `api:${"unknown"}`,
});
