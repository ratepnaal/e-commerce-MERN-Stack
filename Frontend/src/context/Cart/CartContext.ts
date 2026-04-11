import { createContext, useContext } from "react";
import type { CartItemType } from "../../tyoes/CartItem";

interface CartContextType {
  cartItems:CartItemType[];
  totalAmount:number;
  addItemToCart:(productId:string)=>Promise<void>;
  increaseItemQuantity:(productId:string, currentQuantity:number)=>Promise<void>;
  decreaseItemQuantity:(productId:string, currentQuantity:number)=>Promise<void>;
  removeItemFromCart:(productId:string)=>Promise<void>;
  clearCart:()=>Promise<void>;
  checkoutCart:(address:string)=>Promise<boolean>;
}

export const CartContext = createContext<CartContextType>({
   cartItems:[],
   totalAmount:0,
   addItemToCart:async ()=>{},
   increaseItemQuantity:async ()=>{},
   decreaseItemQuantity:async ()=>{},
  removeItemFromCart:async ()=>{},
  clearCart:async ()=>{},
  checkoutCart:async ()=>false
      })

export const useCart = ()=> useContext(CartContext)