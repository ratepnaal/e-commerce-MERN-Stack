import {  Routes , BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/Auth/AuthProvider"



function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/register" element={<RegisterPage />}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
   </>
  )
}

export default App
