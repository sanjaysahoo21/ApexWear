# ApexWear Frontend Authentication Flow (Tenglish Version)

Ee document lo, ApexWear React client application lo unna authentication flow gurinchi detail ga vivarinchabadindi. Ee frontend, user interaction, authentication state (JWTs tho saha) manage cheyyadam, mariyu backend API tho matladadam lanti panulu chestundi.

## Pradhaanamaina (Core) Technologies & Libraries

- **React:** User interface build cheyyadaniki.
- **React Router:** Client-side routing and navigation handle cheyyadaniki.
- **Axios:** Backend API ki HTTP requests pampadaniki.
- **`localStorage`:** JWT and user information ni browser sessions lo save chesi unchadaniki.

---

## File Vaari Vivarana (File-by-File Breakdown)

### 1. `App.jsx`

Idi mana application ki root component. Ikkada `react-router-dom` use chesi main routing structure ni set chestam.

**Mukhyamaina (Key) Logic:**

- **`<BrowserRouter>`:** Client-side routing enable cheyyadaniki antha application ni wrap chestundi.
- **`<Routes>`:** Ivi veru veru routes ni, avi ye components render cheyyalo define chestayi.
- **Public Routes:**
  - `/login` anedi `Login` component ni render chestundi.
  - `/signup` anedi `Signup` component ni render chestundi.
  - `/oauth2/success` anedi `OAuth2Success` component ni render chestundi. Idi successful OAuth2 login tarvatha redirect ayye-main place.
- **Protected Routes:**
  - `/home` anedi `ProtectedRoute` component lo wrap cheyyabaddadi. Ante, ee route ni access cheyyalante, `ProtectedRoute` component mundu user authenticate ayyara leda ani check chestundi.

### 2. `utils/axiosConfig.js`

Ee file lo, anni API requests kosam use chese oka global Axios instance configure cheyyabaddadi. Deenilo JWT ni header lo add cheyyadaniki and authentication errors handle cheyyadaniki interceptors untayi.

**Mukhyamaina Logic:**

- **`axios.create(...)`:** Use cheskovadaniki oka Axios instance ni create chestundi.
- **Request Interceptor (`axiosInstance.interceptors.request.use(...)`):**
  - Ee function, prati request pampadaniki *mundu* execute avuthundi.
  - Idi `localStorage` nunchi JWT ni tiskuntundi.
  - Token unte, adi automatic ga request `Authorization` header lo `Bearer` token la add avuthundi.
  - Deenivalla, prati API call ki manually header add cheyyalsina avasaram undadu.
- **Response Interceptor (`axiosInstance.interceptors.response.use(...)`):**
  - Ee function, backend nunchi response vachinappudu execute avuthundi.
  - Idi `401 Unauthorized` errors kosam check chestundi.
  - Okavela 401 error vaste (ante JWT invalid or expired), adi `localStorage` nunchi పాత token and user data ni remove chestundi.
  - Tarvatha user ni `/login` page ki redirect chestundi. Session expiry ni handle cheyyadaniki idi central place.

### 3. `components/ProtectedRoute.jsx`

Idi oka higher-order component. Protected routes ki gatekeeper la pani chestundi.

**Mukhyamaina Logic:**

- `localStorage` lo JWT unda leda ani check chestundi.
- **Token unte:** Daaniki pass chesina `children` components ni (udaharana ki `Home` page) render chestundi.
- **Token lekapothe:** React Router nunchi `<Navigate>` component use chesi user ni automatic ga `/login` page ki redirect chestundi.

### 4. `pages/Auth/Login.jsx`

Ee component lo standard email/password login and Google OAuth2 login start cheyyadaniki UI and logic untundi.

**Mukhyamaina Logic:**

- **State Management:** `useState` tho email, password, loading state, mariyu error/success messages ni manage chestundi.
- **`handleSubmit(e)`:**
  - User login form submit chesinప్పుడు ee function call avuthundi.
  - Idi client-side validation chestundi.
  - `axiosInstance` use chesi backend `/api/auth/login` endpoint ki `POST` request pampistundi.
  - **Success ayithe:** Backend nunchi JWT, email, and role tho response vastundi. Aa `token` and `user` data ni `localStorage` lo store chestundi. Success message chupinchi, user ni `/home` page ki navigate chestundi.
  - **Fail ayithe:** API nunchi vachina errors (401 lantiవి) ni pattukuni, correct error message chupistundi.
- **`handleGoogleLogin()`:**
  - User "Continue with Google" button click chesinappudu ee function call avuthundi.
  - Idi user browser ni backend OAuth2 endpoint ki (`http://localhost:8080/oauth2/authorization/google`) redirect chestundi. Ikkada nunchi backend and Google authentication process ni chuskuntayi.

### 5. `pages/Auth/Signup.jsx`

Ee component kottha user registration kosam UI and logic ni isthundi.

**Mukhyamaina Logic:**

- **`handleSubmit(e)`:**
  - Account create cheyyadaniki form submission ni handle chestundi.
  - Client-side validation (password match lantiవి) chestundi.
  - Backend `/api/auth/signup` endpoint ki `POST` request pampistundi.
  - **Success ayithe:** Vachina token and user data ni `localStorage` lo store chestundi. Success message chupinchi, user ni `/login` page ki redirect chestundi.
  - **Fail ayithe:** Sambandhitha error messages ("Email already exists" lantiవి) chupistundi.
- **`handleGoogleSignup()`:** Login page laage, idi kuda Google OAuth2 flow ni start chestundi.

### 6. `pages/Auth/OAuth2Success.jsx`

Ee component OAuth2 flow lo chala mukhyamainadi. Idi user ki ekkuva sepu kanipinchadu. Deeni okkate pani, successful Google login tarvatha backend nunchi vachina redirect ni handle cheyyadam.

**Mukhyamaina Logic:**

- **`useEffect` Hook:** Component load avvagane idi run avuthundi.
- **URL Parsing:** `URLSearchParams` use chesi URL nunchi query parameters ni parse chestundi. Backend `/oauth2/success?token=...&email=...` lanti URL ki redirect chestundi.
- **Token and Data Extraction:** URL nunchi `token`, `email`, and `role` ni extract chestundi.
- **State Storage:** Aa token and user data ni `localStorage` lo store chestundi. Idi client-side lo user ni login chesinatte.
- **Redirection:** Ventane user ni `/home` page ki `navigate` chestundi. Deenivalla browser URL bar nunchi JWT clean aipothundi.

---
## Authentication Flows Saramsham (Summary)

### Standard Login Flow

1.  User `/login` ki veltharu.
2.  Credentials enter chesi "Login" click chestadu.
3.  `Login.jsx`, `/api/auth/login` endpoint ni call chestundi.
4.  Successful ayithe, JWT vachi `localStorage` lo store avuthundi.
5.  User `/home` ki redirect avutharu.
6.  `ProtectedRoute` `localStorage` check chesi, token undadam valla access isthundi.
7.  `axiosConfig` valla tharuvatha anni API calls automatic ga authenticate avuthayi.

### Google OAuth2 Flow

1.  User `/login` or `/signup` lo "Continue with Google" click chestadu.
2.  `Login.jsx` browser ni backend Google auth endpoint ki redirect chestundi.
3.  Backend, Google ki redirect chestundi. User authenticate avutharu. Google malli backend ki redirect chestundi.
4.  Backend `OAuth2SuccessHandler` user ni create chesi, JWT generate chesi, browser ni frontend `/oauth2/success` ki token tho pampistundi.
5.  `OAuth2Success.jsx` component load avuthundi.
6.  Adi URL nunchi token parse chesi, `localStorage` lo save chestundi.
7.  Ventane user ni `/home` ki redirect chestundi.
8.  `ProtectedRoute` token chusi access isthundi. User login ayipoyaru.
