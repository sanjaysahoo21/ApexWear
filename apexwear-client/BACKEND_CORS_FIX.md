# 🔧 Spring Boot Backend - CORS Configuration Fix

## ❌ Current Error in Your Backend

Your Spring Boot backend is returning:
```
Status Code: 403 Forbidden
Method: OPTIONS (preflight request)
Missing Header: Access-Control-Allow-Origin
```

This means **CORS is NOT configured** in your Spring Boot application.

---

## ✅ Solution: Configure CORS in Spring Boot

You need to add CORS configuration to your Spring Boot backend. Here are **3 methods** to fix it:

---

## 🎯 Method 1: Global CORS Configuration (RECOMMENDED)

Create a new configuration class in your Spring Boot project:

### File Location:
```
src/main/java/com/apexwear/config/CorsConfig.java
```

### Code:

```java
package com.apexwear.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        
        // Allow credentials (Authorization headers, cookies)
        corsConfiguration.setAllowCredentials(true);
        
        // Allow frontend origins
        corsConfiguration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000"
        ));
        
        // Allow all headers
        corsConfiguration.setAllowedHeaders(Arrays.asList(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // Expose headers to frontend
        corsConfiguration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Disposition"
        ));
        
        // Allow HTTP methods
        corsConfiguration.setAllowedMethods(Arrays.asList(
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH",
            "OPTIONS"
        ));
        
        // Cache preflight response for 1 hour
        corsConfiguration.setMaxAge(3600L);
        
        // Apply CORS configuration to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        
        return new CorsFilter(source);
    }
}
```

### What This Does:
✅ Allows requests from your frontend (localhost:5173, 5174, 3000)
✅ Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
✅ Allows Authorization header (for JWT tokens)
✅ Allows credentials (cookies, auth headers)
✅ Caches preflight response for 1 hour
✅ Applies to all endpoints (`/**`)

---

## 🎯 Method 2: WebMvcConfigurer (Alternative)

If you prefer using `WebMvcConfigurer`:

### File Location:
```
src/main/java/com/apexwear/config/WebConfig.java
```

### Code:

```java
package com.apexwear.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## 🎯 Method 3: @CrossOrigin Annotation (Quick Fix)

Add `@CrossOrigin` annotation directly to your controllers:

### On Controller Class:

```java
package com.apexwear.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, 
             allowCredentials = "true",
             maxAge = 3600)
public class AuthController {
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // Your signup logic
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Your login logic
    }
}
```

### On Individual Endpoints:

```java
@PostMapping("/login")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Your login logic
}
```

### For Home Endpoint:

```java
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, 
             allowCredentials = "true")
public class HomeController {
    
    @GetMapping("/home")
    public ResponseEntity<?> home() {
        return ResponseEntity.ok(
            Map.of("message", "Welcome to the Home Page! You are successfully logged in.")
        );
    }
}
```

---

## 🔍 Verify Your Backend Configuration

### Step 1: Check if Spring Security is blocking CORS

If you have Spring Security, you need to configure it to allow CORS:

```java
package com.apexwear.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // Enable CORS
            .and()
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/auth/**", "/api/auth/health").permitAll()
                .antMatchers("/home").authenticated()
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                
        return http.build();
    }
}
```

**Important:** Add `.cors()` in your security chain!

---

## 🧪 Test Your Backend CORS Configuration

### Test 1: Using cURL

```bash
# Test OPTIONS preflight request
curl -X OPTIONS http://localhost:8080/api/auth/login \
  -H "Origin: http://localhost:5174" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

**Expected Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:5174
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600
```

### Test 2: Using Postman

1. Open Postman
2. Create a new request:
   - Method: `POST`
   - URL: `http://localhost:8080/api/auth/login`
   - Headers:
     - `Content-Type: application/json`
     - `Origin: http://localhost:5174`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
3. Send request
4. Check response headers for CORS headers

### Test 3: Browser Console

After implementing CORS, test in browser:

```javascript
// Open browser console on http://localhost:5174
fetch('http://localhost:8080/api/auth/health', {
  method: 'GET',
  headers: {
    'Origin': 'http://localhost:5174'
  }
})
.then(res => res.text())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

---

## 🐛 Common Issues and Solutions

### Issue 1: Still Getting 403 Forbidden

**Cause:** Spring Security is blocking the request before CORS

**Solution:** 
1. Make sure `.cors()` is added in SecurityConfig
2. Permit OPTIONS requests:
```java
.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
```

### Issue 2: "allowCredentials cannot be true when allowedOrigins is *"

**Cause:** You're using `allowedOrigins("*")` with `allowCredentials(true)`

**Solution:** Specify exact origins:
```java
.allowedOrigins("http://localhost:5174")
// NOT: .allowedOrigins("*")
```

### Issue 3: CORS works but JWT still fails

**Cause:** Authorization header not allowed

**Solution:** Add "Authorization" to allowed headers:
```java
.allowedHeaders("Content-Type", "Authorization")
```

### Issue 4: Works in Postman but not in Browser

**Cause:** Browsers send OPTIONS preflight, Postman doesn't

**Solution:** 
1. Ensure OPTIONS method is allowed
2. Check browser DevTools → Network → Look for OPTIONS request
3. Verify OPTIONS returns 200 OK

---

## 📋 Checklist for Your Backend

Before testing, verify:

- [ ] Created `CorsConfig.java` OR `WebConfig.java` OR added `@CrossOrigin`
- [ ] Restarted Spring Boot application
- [ ] Backend running on `http://localhost:8080`
- [ ] CORS allows `http://localhost:5174`
- [ ] CORS allows POST, GET, OPTIONS methods
- [ ] CORS allows "Authorization" header
- [ ] CORS allows credentials (allowCredentials = true)
- [ ] Spring Security (if used) has `.cors()` enabled
- [ ] OPTIONS requests return 200 OK (not 403)

---

## 🚀 Step-by-Step Implementation

### 1. Add CORS Configuration

Choose Method 1 (Global CorsConfig) and create the file.

### 2. Restart Spring Boot

```bash
# Stop your Spring Boot app (Ctrl+C)
# Then restart:
./mvnw spring-boot:run
# or
java -jar target/your-app.jar
```

### 3. Verify Backend is Running

```bash
curl http://localhost:8080/api/auth/health
```

Should return: `"API is running"` or similar

### 4. Test CORS Headers

```bash
curl -I -X OPTIONS http://localhost:8080/api/auth/login \
  -H "Origin: http://localhost:5174"
```

Look for:
```
Access-Control-Allow-Origin: http://localhost:5174
Access-Control-Allow-Methods: ...
```

### 5. Test from Frontend

1. Restart frontend: `npm run dev`
2. Open `http://localhost:5174/login`
3. Try to login
4. Check DevTools → Console (no CORS error)
5. Check DevTools → Network → Request headers

---

## ✅ Expected Result After Fix

### Browser Console:
```
✅ No CORS error
✅ POST /api/auth/login - 200 OK (or 401 with wrong credentials)
```

### Network Tab Headers:
```
Request Headers:
  Origin: http://localhost:5174
  Content-Type: application/json

Response Headers:
  Access-Control-Allow-Origin: http://localhost:5174
  Access-Control-Allow-Credentials: true
  Content-Type: application/json
```

### Backend Logs:
```
✅ No 403 errors
✅ POST requests processed successfully
✅ OPTIONS requests return 200 OK
```

---

## 📝 Quick Copy-Paste Solution

**Just copy this entire file into your Spring Boot project:**

**File:** `src/main/java/com/apexwear/config/CorsConfig.java`

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
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174", "http://localhost:3000"));
        config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

**Then restart your Spring Boot app!**

---

## 🎯 Summary

### What You Need to Do:

1. **Create `CorsConfig.java`** in your backend (copy code above)
2. **Restart Spring Boot application**
3. **Verify OPTIONS requests work** (using cURL or browser)
4. **Test login from frontend** (should work now!)

### Two-Sided Solution:

- **Frontend (Already Done)**: Vite proxy configuration ✅
- **Backend (You Need to Do)**: Add CORS configuration ⚠️

With both solutions in place, CORS errors will be gone permanently!

---

## 🔗 Need Help?

If CORS still doesn't work after adding configuration:

1. Check Spring Boot logs for errors
2. Verify the configuration class is being loaded (add `@Slf4j` and log something)
3. Make sure you restarted the backend
4. Test with cURL first (eliminates browser caching issues)
5. Check if Spring Security is blocking (if using security)

**The backend CORS configuration is the permanent solution for production!** 🚀

