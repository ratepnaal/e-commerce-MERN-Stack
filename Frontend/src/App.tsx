import {  Routes , BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import ProtectedRoute from "./components/ProtectedRoute"
import CartProvider from "./context/Cart/CartProvider"
import CheckoutPage from "./pages/CheckoutPage"
import MyOrdersPage from "./pages/MyOrdersPage"
import { AlertProvider } from "./components/useAlert"



function App() {

  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <CartProvider>
            <BrowserRouter>
              <Navbar/>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route element={<ProtectedRoute/>}>
                  <Route path="/cart" element={<CartPage />}/>
                  <Route path="/checkout" element={<CheckoutPage />}/>
                  <Route path="/my-orders" element={<MyOrdersPage />}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AlertProvider>
      </AuthProvider>
   </>
  )
}

export default App
