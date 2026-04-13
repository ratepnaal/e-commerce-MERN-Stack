import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = ()=>{
const {cartItems, totalAmount, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart, clearCart} = useCart();
const navigate = useNavigate();

const finalTotal = totalAmount || cartItems.reduce((sum, item)=> sum + (item.unitPrice * item.quintity), 0);

return(
    <>
    <section className="section-shell mx-auto mt-10 w-[95%] max-w-6xl rounded-3xl p-5 md:p-7">
        <div className="mb-6 flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Shopping cart</p>
                <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">Cart Summary</h1>
            </div>
            <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                    {cartItems.length} items
                </span>
                {cartItems.length > 0 && (
                    <button
                        onClick={()=>{clearCart()}}
                        className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                        Clear Cart
                    </button>
                )}
            </div>
        </div>

        {cartItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                Your cart is empty.
            </div>
        ) : (
            <>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Product Name</th>
                                <th className="px-4 py-3 font-semibold">Short Description</th>
                                <th className="px-4 py-3 font-semibold">Image</th>
                                <th className="px-4 py-3 font-semibold">Unit Price</th>
                                <th className="px-4 py-3 font-semibold">Quantity</th>
                                <th className="px-4 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item)=> (
                                <tr key={item.productId} className="border-t border-slate-200 hover:bg-slate-50">
                                    <td className="px-4 py-3 font-semibold text-slate-800">{item.title}</td>
                                    <td className="px-4 py-3 text-slate-600">{`${item.title} - high quality item`}</td>
                                    <td className="px-4 py-3">
                                        <img
                                            src={item.productImage}
                                            alt={item.title}
                                            className="h-14 w-14 rounded-lg object-cover ring-1 ring-slate-200"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-700">${item.unitPrice.toFixed(2)}</td>
                                    <td className="px-4 py-3 font-semibold text-slate-700">{item.quintity}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                onClick={()=>{increaseItemQuantity(item.productId, item.quintity)}}
                                                className="h-8 w-8 rounded-md bg-emerald-500 text-white transition hover:bg-emerald-600"
                                                aria-label={`increase ${item.title}`}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={()=>{decreaseItemQuantity(item.productId, item.quintity)}}
                                                className="h-8 w-8 rounded-md bg-amber-500 text-white transition hover:bg-amber-600"
                                                aria-label={`decrease ${item.title}`}
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={()=>{removeItemFromCart(item.productId)}}
                                                className="rounded-md bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 flex justify-end">
                    <div className="w-full rounded-2xl bg-slate-900 p-4 text-white md:w-[320px]">
                        <div className="mb-2 text-sm text-slate-300">Final Total</div>
                        <div className="text-2xl font-extrabold">${finalTotal.toFixed(2)}</div>
                        <button
                            onClick={()=>{navigate('/checkout', { state: { fromCart: true } })}}
                            className="mt-4 w-full rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                        >
                            Go To Checkout
                        </button>
                    </div>
                </div>
            </>
        )}
    </section>
    </>
)
}

export default CartPage;