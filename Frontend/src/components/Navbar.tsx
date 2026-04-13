import { FaCartPlus } from "react-icons/fa";
import AppMenu from './AppMenu';
import { useNavigate } from 'react-router-dom';
import logo from '../photos/logo.png';
import { useCart } from "../context/Cart/CartContext";



const Navbar = ()=>{
    const {cartItems} = useCart();
const cartCount = cartItems.length;
const navigate = useNavigate();
    return(
<header className="sticky top-0 z-40 px-3 pt-3">
    <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 shadow-lg backdrop-blur-md md:px-6">
        <button onClick={()=>navigate('/')} className='group flex items-center gap-3'>
            <img src={logo} className='h-11 w-11 rounded-xl border border-slate-200 bg-white p-1 shadow-sm' alt="Technical Store logo" />
            <div className='text-left'>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-teal-600'>E-commerce</p>
                <h1 className='text-base font-bold text-slate-900 md:text-lg'>Technical Store</h1>
            </div>
        </button>

        <div className='flex items-center gap-3 md:gap-4'>
            <button
                onClick={()=>{navigate('/cart')}}
                className='relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-teal-600'
                aria-label="Open cart"
            >
                <FaCartPlus className='drop-shadow-sm'/>
                {cartCount > 0 && (
                    <span className='absolute -right-2 -top-2 min-w-5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[11px] font-bold text-white shadow'>
                        {cartCount}
                    </span>
                )}
            </button>

            <AppMenu/>
        </div>
    </div>
</header>
    )
}

export default Navbar;