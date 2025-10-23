# Server Actions & HTTP API Implementation

This project demonstrates both **Server Actions** and **HTTP API calls with axios** in a Next.js application. Both approaches are fully implemented with proper TypeScript types, error handling, and validation.

## 🏗️ Architecture Overview

### Server Actions
- **Location**: `src/libs/actions/`
- **Purpose**: Direct server-side execution with form data
- **Benefits**: 
  - No client-side JavaScript required
  - Automatic form handling
  - Built-in security
  - Progressive enhancement

### HTTP API Routes
- **Location**: `src/app/api/`
- **Purpose**: RESTful API endpoints for client-side consumption
- **Benefits**:
  - Standard HTTP methods (GET, POST, PUT, DELETE)
  - JSON request/response format
  - Works with any HTTP client
  - Better for mobile apps or external integrations

## 📁 File Structure

```
src/
├── libs/
│   ├── actions/
│   │   └── auth.ts              # Server actions for authentication
│   ├── api/
│   │   ├── client.ts            # Axios client configuration
│   │   └── services.ts           # API service functions
│   └── types/
│       └── api.ts               # TypeScript types for API
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts   # POST /api/auth/login
│   │   │   └── register/route.ts # POST /api/auth/register
│   │   └── user/
│   │       └── profile/route.ts # GET/PUT /api/user/profile
│   └── (auth)/
│       └── login/
│           └── page.tsx         # Demo page showing both approaches
```

## 🚀 Features Implemented

### Server Actions (`src/libs/actions/auth.ts`)
- ✅ `loginAction()` - User login with form data
- ✅ `registerAction()` - User registration with form data
- ✅ `logoutAction()` - User logout with redirect
- ✅ `getUserProfileAction()` - Get user profile data
- ✅ Input validation with Zod
- ✅ Error handling and user feedback

### HTTP API Routes (`src/app/api/`)
- ✅ `POST /api/auth/login` - Login endpoint
- ✅ `POST /api/auth/register` - Registration endpoint
- ✅ `GET /api/user/profile` - Get user profile
- ✅ `PUT /api/user/profile` - Update user profile
- ✅ JWT token handling with httpOnly cookies
- ✅ Proper HTTP status codes
- ✅ JSON response format

### Axios Client (`src/libs/api/client.ts`)
- ✅ Configured axios instance with interceptors
- ✅ Automatic token handling
- ✅ Request/response logging
- ✅ Error handling and redirects
- ✅ Generic API methods (get, post, put, patch, delete)

### API Services (`src/libs/api/services.ts`)
- ✅ `authApi` - Authentication services
- ✅ `userApi` - User management services
- ✅ `productApi` - Product CRUD operations
- ✅ `orderApi` - Order management
- ✅ Type-safe API calls

## 🎯 Usage Examples

### Server Actions (Form-based)

```tsx
// In a React component
import { loginAction } from '@/libs/actions/auth';

export default function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

### HTTP API Calls (Client-side)

```tsx
// In a React component
import { authApi } from '@/libs/api/services';

export default function LoginForm() {
  const handleLogin = async (credentials) => {
    try {
      const result = await authApi.login(credentials);
      if (result.success) {
        // localStorage.setItem('authToken', result.data.token);
        // Handle success
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
    </form>
  );
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (for production)
DATABASE_URL=your_database_url

# JWT Secret (for production)
JWT_SECRET=your_jwt_secret
```

### Axios Configuration

The axios client is configured with:
- Base URL from environment variables
- 10-second timeout
- Automatic token injection
- Request/response interceptors
- Error handling with automatic logout on 401

## 🛡️ Security Features

### Server Actions
- ✅ Input validation with Zod schemas
- ✅ Server-side execution only
- ✅ No client-side exposure of sensitive logic

### HTTP API Routes
- ✅ JWT token validation
- ✅ HttpOnly cookies for token storage
- ✅ CORS protection
- ✅ Input validation
- ✅ Proper error handling

## 📊 Type Safety

All API calls are fully typed with TypeScript:

```typescript
// Request types
interface LoginRequest {
  email: string;
  password: string;
}

// Response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Usage
const result: ApiResponse<AuthResponse> = await authApi.login(credentials);
```

## 🧪 Testing the Implementation

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit the login page**: `http://localhost:3000/login`

3. **Test Server Actions**:
   - Use the "Server Actions" section
   - Try logging in with: `user@example.com` / `password123`

4. **Test HTTP API**:
   - Use the "HTTP API Calls" section
   - Same credentials work for both approaches

## 🔄 When to Use Each Approach

### Use Server Actions when:
- ✅ Building traditional web applications
- ✅ Progressive enhancement is important
- ✅ You want to reduce client-side JavaScript
- ✅ Form-based interactions
- ✅ SEO is critical

### Use HTTP API when:
- ✅ Building SPAs (Single Page Applications)
- ✅ Mobile app integration
- ✅ Real-time features with WebSockets
- ✅ External API integrations
- ✅ Complex client-side state management

## 🚀 Next Steps

To extend this implementation:

1. **Add Database Integration**:
   - Replace mock data with real database calls
   - Add Prisma or similar ORM

2. **Implement Authentication Middleware**:
   - JWT token validation middleware
   - Role-based access control

3. **Add More API Endpoints**:
   - Product management
   - Order processing
   - File uploads

4. **Enhance Error Handling**:
   - Custom error classes
   - Detailed error logging
   - User-friendly error messages

5. **Add Testing**:
   - Unit tests for server actions
   - Integration tests for API routes
   - E2E tests for complete flows

## 📝 Notes

- This implementation uses mock data for demonstration
- In production, replace with real database operations
- JWT tokens are simplified for demo purposes
- Add proper password hashing (bcrypt) in production
- Implement rate limiting for API endpoints
- Add comprehensive logging and monitoring
