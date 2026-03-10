import {useState, type FC , type PropsWithChildren} from 'react'
import { CartContext } from './CartContext'
import type { CartItemType } from '../../tyoes/CartItem';
const CartProvider: FC<PropsWithChildren> = ({children})=>{
    const [cartItems , setCartItem] = useState<CartItemType[]>([]);
    const [totalAmount , setTotalAmount] = useState<number>(0);

const addItemToCart = (productId : string)=>{
    console.log(productId)
}
return(
    <>
    <CartContext.Provider value={{cartItems , totalAmount , addItemToCart}}>
        {children}
    </CartContext.Provider>
    </>
)
}

export default CartProvider