import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import OAuth2Success from "./pages/Auth/OAuth2Success.jsx";
import Home from "./pages/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/success" element={<OAuth2Success />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
