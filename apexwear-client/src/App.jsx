import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import OAuth2Success from "./pages/Auth/OAuth2Success.jsx";
import Home from "./pages/Home/Home.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";

function App() {

  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Wishlist />
          <Cart />
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
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  )
}

export default App
