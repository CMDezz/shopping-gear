// src/libs/utils/jwt.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}

// Generate access token (short-lived)
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m', // 15 minutes
    issuer: 'shopping-gear',
    audience: 'shopping-gear-users',
  });
}

// Generate refresh token (long-lived)
export function generateRefreshToken(userId: string): { token: string; tokenId: string } {
  const tokenId = crypto.randomUUID();
  const token = jwt.sign(
    { userId, tokenId },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '7d', // 7 days
      issuer: 'shopping-gear',
      audience: 'shopping-gear-users',
    }
  );
  
  return { token, tokenId };
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'shopping-gear',
      audience: 'shopping-gear-users',
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Access token verification failed:', error);
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'shopping-gear',
      audience: 'shopping-gear-users',
    }) as RefreshTokenPayload;
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

// Generate token pair
export function generateTokenPair(user: { _id: string; email: string }): {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
} {
  const accessToken = generateAccessToken({
    userId: user._id,
    email: user.email,
  });

  const { token: refreshToken, tokenId } = generateRefreshToken(user._id);

  return {
    accessToken,
    refreshToken,
    tokenId,
  };
}
