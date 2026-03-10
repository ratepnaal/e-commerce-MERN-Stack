import { createContext, useContext } from "react";
import type { CartItemType } from "../../tyoes/CartItem";

interface CartContextType {
  cartItems:CartItemType[];
  totalAmount:number;
  addItemToCart:(productId:string)=>void;
}

export const CartContext = createContext<CartContextType>({
   cartItems:[],
   totalAmount:0,
   addItemToCart:()=>{}
      })

export const useCart = ()=> useContext(CartContext)