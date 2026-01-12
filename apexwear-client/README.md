# ApexWear Client

React frontend for ApexWear with JWT authentication and Google OAuth2 integration.

## Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:8080`

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file if you need custom configuration (optional):

```env
VITE_API_BASE_URL=http://localhost:8080
```

The app uses Vite proxy to forward `/api` and `/home` requests to the backend.

## Running the Application

```bash
npm run dev
```

The frontend will start on `http://localhost:5174`

## Features

- **Email/Password Authentication**: Signup and login with credentials
- **Google OAuth2**: One-click login with Google account
- **JWT Token Management**: Automatic token storage and refresh
- **Protected Routes**: Auto-redirect to login if unauthenticated
- **Axios Interceptors**: Auto-attach Bearer tokens to API requests

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx    # Route guard for authentication
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx          # Login page with Google OAuth button
│   │   ├── Signup.jsx         # User registration page
│   │   └── OAuth2Success.jsx  # OAuth2 callback handler
│   └── Home/
│       └── Home.jsx           # Protected home page
├── utils/
│   └── axiosConfig.js         # Axios instance with auth interceptors
├── App.jsx                    # Main routes configuration
└── main.jsx                   # App entry point
```

## Authentication Flow

### Local Login/Signup
1. User enters credentials → Login/Signup page
2. API call to backend `/api/auth/login` or `/api/auth/signup`
3. Backend returns JWT token
4. Token stored in localStorage
5. Redirect to `/home`

### Google OAuth2 Login
1. User clicks "Login with Google"
2. Redirect to `http://localhost:8080/oauth2/authorization/google`
3. Google authentication
4. Backend generates JWT and redirects to `/oauth2/success?token=...&email=...&role=...`
5. Frontend extracts token from URL, stores in localStorage
6. Redirect to `/home`

## API Integration

The app uses a configured axios instance from `utils/axiosConfig.js`:
- **Request Interceptor**: Auto-adds `Authorization: Bearer <token>` header
- **Response Interceptor**: Handles 401 errors by clearing storage and redirecting to login

## Building for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Security

⚠️ **Never commit `.env` files with sensitive data**
- JWT tokens are stored in localStorage
- Tokens are cleared on 401 responses
- All API calls use HTTPS in production
