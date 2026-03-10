import { useCart } from '../context/Cart/CartContext';
import type { Products } from '../tyoes/product';


const ProductCard = ({ _id , image , name , price } : Products)=>{
    const {addItemToCart} = useCart();
    return(
            <div >
                        <div className="overflow-hidden shadow-lg rounded-xl bg-white border border-gray-100 h-full">
                            <div className="flex flex-col">
                                <div className="shrink-0 h-64 md:h-55  mb-3">
                                    <img 
                                        className=" md:w-60 w-70 object-contain" 
                                        src={image} 
                                        alt={name} 
                                    />
                                </div>
                                <div className="p-6 grow mt-2">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                        {name}
                                    </div>
                                    <p className="mt-2 text-gray-500 text-sm">
                                        This is the modern model of {name} !
                                    </p>
                                     <div className=" tracking-wide text-lg text-indigo-950 font-bold mt-1.5">
                                        {price}$ 
                                    </div>
                                    
                                    <div className="mt-4 flex gap-2">
                                        <button 
                                            onClick={()=>addItemToCart(_id)}
                                            className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                                        >
                                            Add To Cart
                                        </button>
                                        <a 
                                            
                                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all"
                                        >
                                            Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
                   
    )
}
export default ProductCard