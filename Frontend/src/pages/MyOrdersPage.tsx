import { useEffect, useMemo, useState } from "react";
import { useAlert } from "../components/useAlert";
import { BASE_URL } from "../constant/baseurl";
import { useAuth } from "../context/Auth/AuthContext";

interface OrderItem {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quintity: number;
}

interface Order {
    _id: string;
    orderItems: OrderItem[];
    total: number;
    address: string;
}

const MyOrdersPage = ()=>{
    const { token } = useAuth();
    const { triggerAlert } = useAlert();
    const [orders, setOrders] = useState<Order[]>([]);
    const [openedOrderId, setOpenedOrderId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(()=>Boolean(token));

    useEffect(()=>{
        if(!token){
            return;
        }

        const fetchOrders = async ()=>{
            try{
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/Cart/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const contentType = response.headers.get("content-type") ?? "";
                const result = contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();

                if(!response.ok){
                    triggerAlert(false, typeof result === "string" ? result : "Failed to fetch orders");
                    setIsLoading(false);
                    return;
                }

                setOrders(result as Order[]);
                setOpenedOrderId((result as Order[])[0]?._id ?? null);
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
                triggerAlert(false, "Failed to fetch orders");
                setIsLoading(false);
            }
        }

        fetchOrders();
    }, [token, triggerAlert]);

    const orderCount = useMemo(()=>orders.length, [orders]);

    return (
        <>
            <section className="section-shell mx-auto mt-10 w-[95%] max-w-6xl rounded-3xl p-5 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Order history</p>
                        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">My Orders</h1>
                    </div>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                        {orderCount} orders
                    </span>
                </div>

                {isLoading ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                        Loading orders...
                    </div>
                ) : orderCount === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                        You have no orders yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order)=>{
                            const firstImage = order.orderItems[0]?.productImage;
                            const totalItems = order.orderItems.reduce((sum, item)=>sum + item.quintity, 0);
                            const isOpen = openedOrderId === order._id;

                            return (
                                <article key={order._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <button
                                        onClick={()=>{setOpenedOrderId(isOpen ? null : order._id)}}
                                        className="w-full p-4 text-left transition hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={firstImage}
                                                alt="order preview"
                                                className="h-14 w-14 rounded-lg object-cover ring-1 ring-slate-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                                                <p className="text-xs text-slate-500">{totalItems} items • {order.orderItems.length} products</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-500">Total</p>
                                                <p className="text-lg font-extrabold text-slate-800">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-200 bg-slate-50 p-4">
                                            <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm text-slate-700">
                                                <span className="font-semibold text-teal-700">Shipping Address:</span> {order.address}
                                            </div>

                                            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
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
                                                        {order.orderItems.map((item, idx)=>(
                                                            <tr key={`${order._id}-${idx}`} className="border-t border-slate-200">
                                                                <td className="px-4 py-3 font-semibold text-slate-800">{item.productTitle}</td>
                                                                <td className="px-4 py-3">
                                                                    <img src={item.productImage} alt={item.productTitle} className="h-12 w-12 rounded-md object-cover ring-1 ring-slate-200"/>
                                                                </td>
                                                                <td className="px-4 py-3 text-slate-700">${item.unitPrice.toFixed(2)}</td>
                                                                <td className="px-4 py-3 text-slate-700">{item.quintity}</td>
                                                                <td className="px-4 py-3 font-semibold text-slate-800">${(item.unitPrice * item.quintity).toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            )
                        })}
                    </div>
                )}
            </section>
        </>
    )
}

export default MyOrdersPage;
