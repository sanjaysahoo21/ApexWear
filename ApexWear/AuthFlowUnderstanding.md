# ApexWear Backend Authentication Flow (Tenglish Version)

Ee document lo, ApexWear Spring Boot application lo unna authentication and authorization flow gurinchi detail ga explain cheyyabadindi. Ee system lo rendu rakala authentication untundi: okati standard API authentication kosam **JWT (JSON Web Token)**, rendodi social login (Google lanti) kosam **OAuth2**.

## Pradhaanamaina (Core) Technologies

- **Spring Security:** Security ki sambandhinchina anni vishayalanu handle cheyyadaniki idi foundation.
- **JWT (JSON Web Token):** Stateless authentication tokens create cheyyadaniki idi use avuthundi.
- **OAuth2:** Google lanti third-party providers tho authentication enable cheyyadaniki.
- **BCrypt:** User passwords ni securely hash chesi, verify cheyyadaniki.

---

## File Vaari Vivarana (File-by-File Breakdown)

### 1. `configuration/SecurityConfig.java`

Idi Spring Security kosam central configuration file. Ikkada manam security filter chain, authentication providers, mariyu authorization rules ni define chestam.

**Mukhyamaina (Key) Methods & Configuration:**

- **`filterChain(HttpSecurity http)`:** Ee bean lo core security rules configure chestam.
  - **`csrf(csrf -> csrf.disable())`:** Cross-Site Request Forgery protection ni disable chestundi. Stateless REST APIs lo idi common.
  - **`sessionManagement(...)`:** Session management ni `STATELESS` ga configure chestundi. Ante, server lo ye session information undadu. Prati request ki JWT tho authenticate avvali.
  - **`authorizeHttpRequests(...)`:** Ye endpoints public, ye endpoints ki authentication avasaram anedi ikkada define chestam.
    - `/api/auth/signup`, `/api/auth/login`, `/oauth2/**`: Ee paths anni public (`permitAll`) ga untayi.
    - `/home` lanti migatha anni requests ki authentication undali (`anyRequest().authenticated()`).
  - **`oauth2Login(...)`:** OAuth2 login flow ni configure chestundi.
    - **`successHandler(oAuth2SuccessHandler)`:** OAuth2 login successful ayinప్పుడు, ee custom handler (`OAuth2SuccessHandler`) execute avuthundi.
  - **`cors(...)`:** Cross-Origin Resource Sharing (CORS) ni configure chestundi, ante mana frontend (`http://localhost:5174`) nunchi vache requests ni allow chestundi.
  - **`addFilterBefore(jwtFilter, ...)`:** Mana custom `JwtFilter` ni filter chain lo inject chestundi. Prati request, JWT kosam check cheyyabaduthundi (public endpoints thappa).

- **`passwordEncoder()`:** Idi `BCryptPasswordEncoder` bean ni isthundi. Deenitho passwords hash chesi store chestam.

- **`authenticationManager(...)`:** Idi `AuthenticationManager` bean ni isthundi, idi authentication requests ni process chestundi.

### 2. `auth/controller/AuthController.java`

Ee controller lo registration and login kosam pradhaanamaina authentication endpoints untayi.

**Mukhyamaina Methods:**

- **`signup(@RequestBody RegesterRequest request)`:**
  - `POST /api/auth/signup` ni handle chestundi.
  - Input request ni validate chestundi.
  - Aa email tho user unnaro ledo check chestundi.
  - Kottha user ayithe, password ni `passwordEncoder` tho hash chesi, `User` entity create chesi `userRepository` ద్వారా database lo save chestundi.
  - `jwtUtil` tho kottha user ki JWT generate chestundi.
  - Token, email, and role ni client ki pampistundi.

- **`login(@RequestBody LoginRequest request)`:**
  - `POST /api/auth/login` ni handle chestundi.
  - `authenticationManager` tho user credentials (email, password) ni authenticate chestundi. Ee process lo `CustomUserDetailsService` use avuthundi.
  - Authentication successful ayithe, `jwtUtil` tho JWT generate avuthundi.
  - Token, email, and role ni client ki pampistundi. Fail ayithe 401 Unauthorized status vastundi.

### 3. `auth/util/JwtUtil.java`

Ee utility class lo JWT ki sambandhinchina anni operations untayi: generation, parsing, and validation.

**Mukhyamaina Methods:**

- **`generateToken(String username, String role)`:**
  - Kottha JWT create chestundi.
  - Subject (username), role, issue date, and expiration date set chestundi.
  - Secret key tho token ni sign chestundi.

- **`getClaimsFromToken(String token)`:**
  - Icchina JWT ni parse chesi daani claims (payload) ni extract chestundi.

- **`getUsernameFromToken(String token)`:**
  - Token nunchi username ni tiskovadaniki easy method.

- **`isValidateToken(String token, String username)`:**
  - Token lo unna username correct o kaado and token expired avvaledo ledo check chesi, token ni validate chestundi.

### 4. `auth/security/JwtFilter.java`

Idi prati request ki okasari run ayye Spring Security filter. Deeni pani, requests ni intercept chesi, JWT ni validate chesi, token valid ayithe `SecurityContext` ni set cheyyadam.

**Mukhyamaina Methods:**

- **`doFilterInternal(...)`:**
  - **Public Endpoint Bypass:** Munduga, request public endpoint (login, signup, or antha OAuth2 flow) kosama ani check chestundi. Ayithe, JWT validation skip chesi request ni munduku pampistundi. OAuth2 lanti flows start avvadaniki idi chala mukhyam.
  - **Request Interception:** Public endpoint kakapothe, `Authorization` header lo "Bearer " token unda leda ani check chestundi. Ledu ante 401 Unauthorized error pampistundi.
  - **Token Extraction & Validation:** Token unte, daanini extract chesi, `jwtUtil` tho parse chesi username ni tiskuntundi.
  - **User Loading:** Username valid ayi, `SecurityContext` lo authentication lekapothe, `userDetailsService` tho user details load chestundi.
  - **Security Context Setup:** Token antha valid ayithe, `UsernamePasswordAuthenticationToken` create chesi `SecurityContextHolder` lo set chestundi. Deenivalla, Spring Security ki user authenticated ani telustundi.
  - **Error Handling:** Token invalid or expired ayithe, final `catch` block lo 401 error response velthundi. Anni `System.out.println` statements teesiveyyabaddayi.

### 5. `auth/security/OAuth2SuccessHandler.java`

User, Google lanti external provider tho successfully authenticate ayinaka, ee handler process ni manage chestundi.

**Mukhyamaina Methods:**

- **`onAuthenticationSuccess(...)`:**
  - `OAuth2User` nunchi user details (email, name) extract chestundi.
  - Aa email tho user database lo unnaro ledo check chestundi. User lekapothe, `GOOGLE` provider tho kottha user ni create chestundi.
  - Aa user ki `jwtUtil` tho JWT generate chestundi.
  - User browser ni frontend URL (`/oauth2/success`) ki redirect chestundi. Aa URL lo token, email, and role query parameters la pampistundi.

### 6. `auth/service/CustomUserDetailsService.java`

Ee service class `UserDetailsService` interface ni implement chestundi. Deeni pani username (ikkada email) batti user data ni load cheyyadam.

**Mukhyamaina Methods:**

- **`loadUserByUsername(String email)`:**
  - Ee method ni `AuthenticationManager` standard login process lo call chestundi.
  - `userRepository` tho user ni email dwara find chestundi.
  - User dorikithe, `User` entity ni `CustomUserDetails` object lo wrap chesi return chestundi. Lekapothe `UsernameNotFoundException` throw chestundi.

---
## Authentication Flows Saramsham (Summary)

### Standard JWT Login Flow

1.  **Client:** User, frontend lo email and password submit chestadu.
2.  **Frontend:** `/api/auth/login` ki `POST` request pampistundi.
3.  **Backend (`AuthController`):** `authenticationManager` credentials ni validate chestundi.
4.  **Backend (`JwtUtil`):** Successful ayithe, JWT generate avuthundi.
5.  **Backend:** JWT ni client ki response lo pampistundi.
6.  **Frontend:** JWT ni `localStorage` lo store cheskuntundi.
7.  **Frontend (Tharuvatha Requests):** Future lo pampinche prati request ki `Authorization: Bearer <token>` header ni add chestundi.
8.  **Backend (`JwtFilter`):** Prati request lo, ee filter JWT ni validate chesi, access isthundi.

### Google OAuth2 Login Flow

1.  **Client:** User "Continue with Google" button click chestadu.
2.  **Frontend:** User ni backend Google auth URL ki redirect chestundi.
3.  **Backend (Spring Security):** User ni Google login page ki pampistundi.
4.  **Google:** User authenticate ayi, permission isthadu.
5.  **Google:** User ni malli backend callback URL ki pampistundi.
6.  **Backend (`OAuth2SuccessHandler`):** Ee handler call avuthundi. Ikkada user find or create ayyi, JWT generate avuthundi.
7.  **Backend:** User ni frontend success URL (`/oauth2/success`) ki token tho redirect chestundi.
8.  **Frontend (`OAuth2Success.jsx`):** Ee component URL nunchi token parse chesi, `localStorage` lo petti, user ni home page ki redirect chestundi. Login process complete.
