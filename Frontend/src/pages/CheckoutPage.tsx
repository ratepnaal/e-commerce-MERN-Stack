import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../components/useAlert";
import { useCart } from "../context/Cart/CartContext";

const CheckoutPage = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalAmount, checkoutCart } = useCart();
    const { triggerAlert } = useAlert();
    const [address, setAddress] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cameFromCart = Boolean((location.state as { fromCart?: boolean } | null)?.fromCart);

    const finalTotal = useMemo(()=>{
        return totalAmount || cartItems.reduce((sum, item)=> sum + (item.unitPrice * item.quintity), 0);
    }, [cartItems, totalAmount]);

    if(!cameFromCart){
        return <Navigate to="/cart" replace />;
    }

    const handleConfirmOrder = async ()=>{
        if(!address.trim()){
            triggerAlert(false, "Please enter your shipping address");
            return;
        }

        setIsSubmitting(true);
        const isSuccessOrder = await checkoutCart(address.trim());
        setIsSubmitting(false);

        if(isSuccessOrder){
            navigate("/", { replace: true });
        }
    }

    return(
        <>
            <section className="section-shell mx-auto mt-10 w-[95%] max-w-6xl rounded-3xl p-5 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Secure payment</p>
                        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">Checkout</h1>
                    </div>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                        {cartItems.length} items
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                        Your cart is empty. Add items before checkout.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Product</th>
                                        <th className="px-4 py-3 font-semibold">Image</th>
                                        <th className="px-4 py-3 font-semibold">Unit Price</th>
                                        <th className="px-4 py-3 font-semibold">Qty</th>
                                        <th className="px-4 py-3 font-semibold">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item)=> (
                                        <tr key={item.productId} className="border-t border-slate-200 hover:bg-slate-50">
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.title}</td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.title}
                                                    className="h-14 w-14 rounded-lg object-cover ring-1 ring-slate-200"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-700">${item.unitPrice.toFixed(2)}</td>
                                            <td className="px-4 py-3 font-semibold text-slate-700">{item.quintity}</td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">${(item.unitPrice * item.quintity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 p-4">
                                <label htmlFor="address" className="mb-2 block text-sm font-semibold text-slate-700">
                                    Shipping Address
                                </label>
                                <textarea
                                    id="address"
                                    value={address}
                                    onChange={(e)=>{setAddress(e.target.value)}}
                                    placeholder="Enter your full address here..."
                                    className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                                />
                            </div>

                            <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-4 text-white">
                                <div>
                                    <div className="mb-2 text-sm text-slate-300">Final Total</div>
                                    <div className="text-2xl font-extrabold">${finalTotal.toFixed(2)}</div>
                                </div>

                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={isSubmitting || cartItems.length === 0}
                                    className="mt-4 w-full rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-500"
                                >
                                    {isSubmitting ? "Confirming..." : "Confirm Order"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>

        </>
    )
}

export default CheckoutPage;
