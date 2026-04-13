import {useEffect, useState, type FC , type PropsWithChildren} from 'react'
import { CartContext } from './CartContext'
import type { CartItemType } from '../../tyoes/CartItem';
import { BASE_URL } from '../../constant/baseurl';
import { useAlert } from '../../components/useAlert';
import { useAuth } from '../Auth/AuthContext';

interface CartApiResponse {
    items: {
        product: {
            _id: string;
            name: string;
            image: string;
            price: number;
            stock: number;
        };
        quintity: number;
    }[];
    totalAmount: number;
}

// Keep frontend cart shape consistent after any cart API response.
const mapCartItems = (cart:CartApiResponse): CartItemType[] => {
    return cart.items.map(({product, quintity})=>{
        return {
            productId: product._id,
            title: product.name,
            productImage: product.image,
            unitPrice: product.price,
            quintity,
            stock: product.stock
        }
    })
}

const CartProvider: FC<PropsWithChildren> = ({children})=>{
    const {token} = useAuth();
    const [cartItems , setCartItem] = useState<CartItemType[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);
    const { triggerAlert } = useAlert();

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
            return;
        }
        const cart = await response.json();

        setCartItem(mapCartItems(cart));
        setTotalAmount(cart.totalAmount ?? 0);
        
    }
    fetchCart();
},[token, triggerAlert])


    

const addItemToCart = async (productId : string)=>{
    try{
const existingItem = cartItems.find((item)=>item.productId === productId);
if(existingItem && existingItem.quintity >= existingItem.stock){
    triggerAlert(false, "هذا أقصى عدد ممكن طلبه");
    return;
}

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
setCartItem(mapCartItems(cart));
setTotalAmount(cart.totalAmount);

}
catch(err){
    console.log(err);
    triggerAlert(false, "Failed to add item to cart");
}
}

const increaseItemQuantity = async (productId:string, currentQuantity:number)=>{
    try{
        const currentItem = cartItems.find((item)=>item.productId === productId);
        if(currentItem && currentItem.quintity >= currentItem.stock){
            triggerAlert(false, "هذا أقصى عدد ممكن طلبه");
            return;
        }

        const response = await fetch(`${BASE_URL}/Cart/items`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({productId, quintity: currentQuantity + 1})
        })

        const contentType = response.headers.get("content-type") ?? "";
        const cart = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if(!response.ok){
            triggerAlert(false, typeof cart === "string" ? cart : "Failed to update item quantity");
            return;
        }

        setCartItem(mapCartItems(cart));
        setTotalAmount(cart.totalAmount ?? 0);
    }
    catch(err){
        console.log(err);
        triggerAlert(false, "Failed to update item quantity");
    }
}

const decreaseItemQuantity = async (productId:string, currentQuantity:number)=>{
    if(currentQuantity <= 1){
        await removeItemFromCart(productId);
        return;
    }

    try{
        const response = await fetch(`${BASE_URL}/Cart/items`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({productId, quintity: currentQuantity - 1})
        })

        const contentType = response.headers.get("content-type") ?? "";
        const cart = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if(!response.ok){
            triggerAlert(false, typeof cart === "string" ? cart : "Failed to update item quantity");
            return;
        }

        setCartItem(mapCartItems(cart));
        setTotalAmount(cart.totalAmount ?? 0);
    }
    catch(err){
        console.log(err);
        triggerAlert(false, "Failed to update item quantity");
    }
}

const removeItemFromCart = async (productId:string)=>{
    try{
        const response = await fetch(`${BASE_URL}/Cart/items/${productId}`, {
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const contentType = response.headers.get("content-type") ?? "";
        const cart = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if(!response.ok){
            triggerAlert(false, typeof cart === "string" ? cart : "Failed to remove item from cart");
            return;
        }

        setCartItem(mapCartItems(cart));
        setTotalAmount(cart.totalAmount ?? 0);
    }
    catch(err){
        console.log(err);
        triggerAlert(false, "Failed to remove item from cart");
    }
}

const clearCart = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/Cart/`, {
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const contentType = response.headers.get("content-type") ?? "";
        const cart = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if(!response.ok){
            triggerAlert(false, typeof cart === "string" ? cart : "Failed to clear cart");
            return;
        }

        setCartItem([]);
        setTotalAmount(0);
        triggerAlert(true, "Cart cleared successfully");
    }
    catch(err){
        console.log(err);
        triggerAlert(false, "Failed to clear cart");
    }
}

const checkoutCart = async (address:string):Promise<boolean>=>{
    if(!address.trim()){
        triggerAlert(false, "Please enter your shipping address");
        return false;
    }

    try{
        const response = await fetch(`${BASE_URL}/Cart/checkout`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({address})
        })

        const contentType = response.headers.get("content-type") ?? "";
        const result = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if(!response.ok){
            triggerAlert(false, typeof result === "string" ? result : "Failed to confirm order");
            return false;
        }

        setCartItem([]);
        setTotalAmount(0);
        triggerAlert(true, "Order placed successfully");
        return true;
    }
    catch(err){
        console.log(err);
        triggerAlert(false, "Failed to confirm order");
        return false;
    }
}
return(
    <CartContext.Provider value={{cartItems , totalAmount , addItemToCart, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart, clearCart, checkoutCart}}>
        {children}
    </CartContext.Provider>
)
}

export default CartProvider