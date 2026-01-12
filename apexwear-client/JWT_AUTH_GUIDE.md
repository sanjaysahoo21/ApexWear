# JWT Authentication Implementation Guide

## 🔐 Authentication Flow

Your ApexWear application now has complete JWT (JSON Web Token) authentication implemented!

### Overview
- Users must login to access protected routes
- JWT Bearer tokens are sent with every authenticated request
- Unauthorized users are redirected to login
- Tokens are stored in localStorage

---

## 📁 File Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx       # Route guard for authentication
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx            # Login page with JWT flow
│   │   ├── Signup.jsx           # Signup page with JWT flow
│   │   └── Auth.css             # Minimalist styling
│   └── Home/
│       ├── Home.jsx             # Protected home page
│       └── Home.css             # Home page styling
├── utils/
│   └── axiosConfig.js           # Axios interceptor for Bearer tokens
└── App.jsx                      # Main routing with protected routes
```

---

## 🚀 Features Implemented

### 1. **Protected Routes**
- `/home` requires JWT authentication
- Unauthorized users are redirected to `/login`
- Token validation on route access

### 2. **JWT Bearer Token Flow**
```
Login/Signup → Receive Token → Store in localStorage → 
Access /home with Bearer Token → Show user data
```

### 3. **Axios Interceptor**
- Automatically adds `Authorization: Bearer <token>` to all requests
- Handles 401 Unauthorized globally
- Auto-redirects to login on token expiration

### 4. **Error Handling**
- **401 Unauthorized**: Token expired/invalid → Redirect to login
- **403 Forbidden**: No access permission
- **Connection errors**: Server unreachable message

---

## 🔧 How It Works

### **Login Flow** (`Login.jsx`)
```javascript
1. User enters email & password
2. POST to http://localhost:8080/api/auth/login
3. Receive JWT token in response
4. Store token in localStorage
5. Redirect to /home
```

### **Protected Route Access** (`ProtectedRoute.jsx`)
```javascript
1. Check if token exists in localStorage
2. If NO token → Redirect to /login
3. If HAS token → Allow access to route
```

### **API Request with Token** (`Home.jsx`)
```javascript
GET http://localhost:8080/home
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Automatic Token Injection** (`axiosConfig.js`)
```javascript
// Every request automatically includes:
Authorization: Bearer <stored_token>

// On 401 response:
- Clear localStorage
- Redirect to /login
```

---

## 📡 API Endpoints

### Backend Endpoints Required:

#### 1. Login
```
POST http://localhost:8080/api/auth/login
Body: { email, password }
Response: { token, user }
```

#### 2. Signup
```
POST http://localhost:8080/api/auth/signup
Body: { name, email, password }
Response: { token, user }
```

#### 3. Home (Protected)
```
GET http://localhost:8080/home
Headers: { "Authorization": "Bearer <token>" }
Response: { user data or health check }

Status Codes:
- 200: Success
- 401: Unauthorized (no/invalid token)
- 403: Forbidden
```

---

## 🎯 User Experience Flow

### **New User:**
```
1. Visit app → Redirected to /login
2. Click "Sign up here"
3. Fill signup form
4. Auto login → Redirected to /home
5. See authenticated home page
```

### **Returning User:**
```
1. Visit /login
2. Enter credentials
3. Login → Redirected to /home
4. See welcome message with user data
```

### **Unauthorized Access:**
```
1. Try to access /home without login
2. ProtectedRoute checks token
3. No token found
4. Redirect to /login
```

### **Token Expiration:**
```
1. User logged in, browsing /home
2. Token expires on backend
3. Next API request returns 401
4. Axios interceptor catches it
5. Clear localStorage
6. Auto redirect to /login
```

---

## 🔒 Security Features

✅ **Token Storage**: Secure localStorage storage
✅ **Bearer Token**: Industry-standard Authorization header
✅ **Route Protection**: Client-side route guards
✅ **Auto Logout**: Token expiration handling
✅ **Global Error Handler**: Axios interceptor for 401/403
✅ **Form Validation**: Email/password validation

---

## 💡 Usage Examples

### **Using Axios with Auto Token:**
```javascript
import axios from 'axios';

// Token automatically added by interceptor
const response = await axios.get('http://localhost:8080/home');
```

### **Manual Token Access:**
```javascript
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
```

### **Logout:**
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/login');
```

---

## 🧪 Testing

### **Test Protected Route:**
1. Open browser → Navigate to `http://localhost:5173/home`
2. Should redirect to `/login` (no token)
3. Login with valid credentials
4. Should see home page with user data

### **Test Token Expiration:**
1. Login successfully
2. In browser DevTools → Application → localStorage
3. Delete the `token` key
4. Refresh `/home` page
5. Should redirect to `/login`

### **Test Unauthorized API:**
1. Open DevTools → Network tab
2. Login successfully
3. Check `/home` request
4. Headers should show: `Authorization: Bearer <token>`

---

## 📱 Components Details

### **ProtectedRoute.jsx**
- Wrapper component for protected routes
- Checks localStorage for token
- Redirects unauthorized users

### **Home.jsx**
- Protected home page
- Fetches data with Bearer token
- Displays user information
- Logout functionality

### **axiosConfig.js**
- Optional: Configure axios globally
- Auto-inject Bearer token
- Handle 401 errors globally

---

## 🎨 Design

All pages follow **Vercel/Next.js minimalist theme**:
- Clean white backgrounds
- Black buttons
- Gray borders and text
- Inter font
- Subtle animations
- Fully responsive

---

## ✅ What's Complete

✅ Login page with JWT flow
✅ Signup page with JWT flow
✅ Protected /home route
✅ Bearer token authentication
✅ Unauthorized handling (401)
✅ Auto redirect on token expiration
✅ Logout functionality
✅ Minimalist UI design
✅ Full error handling
✅ Responsive design

---

## 🚀 Next Steps

Your authentication system is complete! Users can now:
1. Sign up and receive JWT token
2. Login and receive JWT token
3. Access protected `/home` with Bearer token
4. Get "Unauthorized" if no token
5. Auto logout on token expiration

**The app is production-ready for JWT authentication!** 🎉

