import Alert from "../components/Alert";
import { useAlert } from "../components/useAlert";
import { useCart } from "../context/Cart/CartContext";

const CartPage = ()=>{
const {cartItems} = useCart();
const { isSuccess, showAlert, subtitle, isVisible } = useAlert();

return(
    <>
    <h1 className="text-3xl font-bold text-center mt-10">Cart Page</h1>
{cartItems.map((item)=>(<h1 key={item.productId}>{item.title}</h1>))}

       {showAlert && (
    <div className={`transition-all duration-500 ease-in-out transform    ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
        <Alert
            success={isSuccess}
            MainTitle={isSuccess ? "Success Login !" : "Error Login !"}
            SubTitle={subtitle}
        />
    </div>
)}
    </>
)
}

export default CartPage;