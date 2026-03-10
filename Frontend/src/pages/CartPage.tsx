import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import Alert from "../components/Alert";
import { useAlert } from "../components/useAlert";
import { BASE_URL } from "../constant/baseurl";

const CartPage = ()=>{
    const {token} = useAuth();
const [cart , setCart] = useState();
const { isSuccess, showAlert, subtitle, isVisible, triggerAlert } = useAlert();

useEffect(()=>{
    if(!token){
        return
    }

    const fetchCart = async()=>{
        const response = await fetch (`${BASE_URL}/cart` , {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        if(!response.ok){
            triggerAlert(false , "Error Fetch Data ")
        }
        const data = await response.json();
        setCart(data)
    }
    fetchCart();
},[token])

console.log({cart})
return(
    <>
    <h1>hello Cart Page </h1>
       {showAlert && (
    <div className={`transition-all duration-500 ease-in-out transform    ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
        <Alert
            success={isSuccess}
            MainTitle={isSuccess ? "Success Login !" : "Error Login !"}
            SubTitle={subtitle}
        />
    </div>
)}
    </>
)
}

export default CartPage;