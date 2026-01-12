eck# 🔧 CORS Error - Fixed!

## ❌ The Problem

You encountered a **CORS (Cross-Origin Resource Sharing)** error:

```
Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login' 
from origin 'http://localhost:5174' has been blocked by CORS policy
```

### What is CORS?

CORS is a security feature in browsers that blocks web pages from making requests to a different domain than the one serving the page.

**Your Setup:**
- **Frontend**: `http://localhost:5174` (Vite dev server)
- **Backend**: `http://localhost:8080` (Spring Boot)
- **Problem**: Different ports = Different origins = CORS required!

### Why Did It Fail?

The browser sent an **OPTIONS preflight request** to check if the backend allows cross-origin requests. Your backend returned `403 Forbidden` because CORS is not configured.

---

## ✅ Solution 1: Frontend Proxy (IMPLEMENTED)

I've implemented a **Vite proxy** that forwards API requests from your frontend to the backend. This bypasses CORS during development.

### What Was Changed:

#### 1. **vite.config.js** - Added Proxy Configuration
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/home': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

**How it works:**
- Request to `/api/auth/login` → Proxied to `http://localhost:8080/api/auth/login`
- Request to `/home` → Proxied to `http://localhost:8080/home`
- Browser sees same origin → No CORS error!

#### 2. **Updated API Calls** - Changed to Relative URLs

**Login.jsx:**
```javascript
// Before:
axios.post('http://localhost:8080/api/auth/login', ...)

// After:
axios.post('/api/auth/login', ...)
```

**Signup.jsx:**
```javascript
// Before:
axios.post('http://localhost:8080/api/auth/signup', ...)

// After:
axios.post('/api/auth/signup', ...)
```

**Home.jsx:**
```javascript
// Before:
axios.get('http://localhost:8080/home', ...)

// After:
axios.get('/home', ...)
```

**axiosConfig.js:**
```javascript
// Before:
baseURL: 'http://localhost:8080'

// After:
baseURL: ''
```

---

## 🚀 How to Use the Fix

### Step 1: Restart Your Frontend Server

**IMPORTANT:** You must restart Vite for the proxy configuration to take effect!

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 2: Test the Application

1. Open `http://localhost:5174/login`
2. Try to login
3. Check DevTools Network tab
4. You should see requests to `/api/auth/login` (not full URL)
5. **No CORS error!** ✅

---

## 🔍 How to Verify It's Working

### Check Network Tab (DevTools):

**Before Fix:**
```
Request URL: http://localhost:8080/api/auth/login
Status: (failed) - CORS error
```

**After Fix:**
```
Request URL: http://localhost:5174/api/auth/login (proxied to :8080)
Status: 200 OK (or 400/401 based on credentials)
```

### Look for These Changes:

1. ✅ Request URL shows `localhost:5174` (not `:8080`)
2. ✅ No CORS error in console
3. ✅ OPTIONS preflight not visible (proxy handles it)
4. ✅ POST request succeeds

---

## 🛡️ Solution 2: Backend CORS Configuration (RECOMMENDED FOR PRODUCTION)

While the proxy works for development, you should also configure CORS on your backend for production.

### Spring Boot CORS Configuration

Create this file in your backend:

**`CorsConfig.java`**
```java
package com.apexwear.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow specific origins (or use "*" for all - not recommended in production)
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000"
        ));
        
        // Allow specific methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Allow specific headers
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Allow credentials (cookies, authorization headers)
        config.setAllowCredentials(true);
        
        // How long the browser should cache the preflight response
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
```

### Alternative: Use @CrossOrigin Annotation

On your controller:

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {
    // Your endpoints
}
```

Or on specific endpoints:

```java
@PostMapping("/login")
@CrossOrigin(origins = "http://localhost:5174")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Your logic
}
```

---

## 📊 Comparison: Proxy vs Backend CORS

| Feature | Frontend Proxy | Backend CORS |
|---------|---------------|--------------|
| **Development** | ✅ Perfect | ✅ Good |
| **Production** | ❌ Not available | ✅ Required |
| **Setup** | Easy (frontend only) | Moderate (backend) |
| **Security** | Same (dev only) | Configurable |
| **Recommendation** | Development | Production |

### Best Practice:
- ✅ **Development**: Use Vite proxy (already implemented)
- ✅ **Production**: Configure CORS on backend

---

## 🎯 Quick Troubleshooting

### Issue: Still Getting CORS Error

**Solution:**
1. **Restart Vite server** - Config changes require restart
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

2. **Clear browser cache** - Hard refresh:
   - Chrome: `Ctrl + Shift + R`
   - Or: DevTools → Network → "Disable cache"

3. **Check console** - Make sure you see relative URLs:
   ```
   ✅ /api/auth/login
   ❌ http://localhost:8080/api/auth/login
   ```

### Issue: Backend Not Running

**Error:**
```
ECONNREFUSED 127.0.0.1:8080
```

**Solution:**
- Start your Spring Boot backend first
- Verify it's running on port 8080
- Test: `http://localhost:8080/api/auth/health`

### Issue: Port 5174 vs 5173

Vite uses different ports. Update `vite.config.js` if needed:

```javascript
server: {
  port: 5173, // Force specific port
  proxy: { ... }
}
```

---

## 📝 Summary

### What Was Done:
✅ Added Vite proxy configuration
✅ Changed all API calls to relative URLs
✅ Updated axiosConfig.js baseURL

### What You Need to Do:
1. **Restart Vite dev server** (REQUIRED)
   ```bash
   npm run dev
   ```

2. **Test login/signup** - Should work now!

3. **(Optional) Configure CORS on backend** - For production

---

## 🚀 Next Steps

1. **Restart your frontend server NOW**
2. Try logging in again
3. Check for CORS error - should be gone!
4. If deploying to production, implement backend CORS

---

## ✅ Expected Result

**Console (No Errors):**
```
✅ POST /api/auth/login 200 OK
✅ Token stored successfully
✅ Redirecting to /home
```

**Network Tab:**
```
Request URL: http://localhost:5174/api/auth/login
Status: 200 OK
Headers: ✅ All good
```

**Your app should now work perfectly!** 🎉

---

## 📚 Additional Resources

- [Vite Proxy Documentation](https://vitejs.dev/config/server-options.html#server-proxy)
- [Spring Boot CORS](https://spring.io/guides/gs/rest-service-cors/)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**The CORS issue has been fixed!** 🔧✅

**Remember to restart your frontend server for changes to take effect!**

