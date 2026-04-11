import {useState, type FC , type PropsWithChildren} from 'react'
import { CartContext } from './CartContext'
import type { CartItemType } from '../../tyoes/CartItem';
import { BASE_URL } from '../../constant/baseurl';
import { useAlert } from '../../components/useAlert';
import Alert from '../../components/Alert';
import { useAuth } from '../Auth/AuthContext';
const CartProvider: FC<PropsWithChildren> = ({children})=>{
    const {token} = useAuth();
    const [cartItems , setCartItem] = useState<CartItemType[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);
        const { isSuccess, showAlert, subtitle, isVisible, triggerAlert } = useAlert();
    

const addItemToCart = async (productId : string)=>{
    try{
const response = await fetch(`${BASE_URL}/Cart/items` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({productId , quintity:1})
})
const contentType = response.headers.get("content-type") ?? "";
const cart = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

if(!response.ok){
    triggerAlert(false, typeof cart === "string" ? cart : "Failed to add item to cart");
    return;
}
if(!cart){
    triggerAlert(false, "Failed to add item to cart");
    return;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cartItemsMapped = cart.items.map(({product, quintity}:{product: any, quintity: number})=>{
    return {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        unitPrice: product.price,
        quintity
    }
})
setCartItem([...cartItemsMapped]);
setTotalAmount(cart.totalAmount);

}
catch(err){
    console.log(err);
    triggerAlert(false, "Failed to add item to cart");
}
}
return(
    <>
    <CartContext.Provider value={{cartItems , totalAmount , addItemToCart}}>
        {children}
    </CartContext.Provider>

    {showAlert && (
    <div className={`transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
        <Alert
            success={isSuccess}
            MainTitle={isSuccess ? "Add to Card Success !" : "Error Adding to Card !"}
            SubTitle={subtitle}
        />
    </div>
)}
    </>
)
}

export default CartProvider