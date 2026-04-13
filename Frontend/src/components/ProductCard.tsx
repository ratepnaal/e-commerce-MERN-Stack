import { useCart } from '../context/Cart/CartContext';
import type { Products } from '../tyoes/product';


const ProductCard = ({ _id , image , name , price } : Products)=>{
    const {addItemToCart} = useCart();
    return(
            <article className="group section-shell h-full overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex h-full flex-col">
                    <div className="relative h-56 bg-linear-to-b from-slate-50 to-white p-4">
                        <img
                            className="mx-auto h-full w-full object-contain transition duration-500 group-hover:scale-105"
                            src={image}
                            alt={name}
                        />
                    </div>

                    <div className="flex grow flex-col p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">Tech category</p>
                        <h3 className="mt-1 line-clamp-2 text-lg font-bold text-slate-900">{name}</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Performance-focused device with modern build quality.
                        </p>
                        <div className="mt-3 text-xl font-extrabold text-slate-900">${price}</div>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={()=>addItemToCart(_id)}
                                className="rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
                            >
                                Add To Cart
                            </button>
                            <span className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500">
                                Details
                            </span>
                        </div>
                    </div>
                </div>
            </article>
                   
    )
}
export default ProductCard