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
<div className=" h-18 bg-cyan-500 rounded-3xl mx-3 my-2 hover:scale-101 duration-300 delay-150 relative z-50  ">
          
<div className='flex justify-between items-center px-5 py-2 '>

{/*القسم اليميني (الكتابة )*/}

<div className='flex justify-start'>
<button onClick={()=>navigate('/')} className='text-white hover:scale-110 transition-transform duration-200'>
    <h1 className='md:text-xl text-lg font-extrabold text-gray-600'> Technical Store </h1>
</button>
</div>

{/*القسم الأوسط   */}
  <div className='flex-1 '>
    <div className='flex justify-end text-white text-2xl'>
 <button
 onClick={()=>{navigate('/cart')}}
 className='relative hover:scale-110 transition-transform duration-200'>
<FaCartPlus className='drop-shadow-sm'/>
{cartCount > 0 && (
    <span className='absolute -top-2 -right-3 min-w-5 h-5 px-1 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-cyan-500 shadow-md'>
        {cartCount}
    </span>
)}
    </button>
    </div>
   
 
    
   
    
    </div>    

{/* القسم اليساري (اللوغو + المنيو  )*/}


<div className='flex justify-end' >
    <div className='p-2 mr-6'>
        <AppMenu/>
    </div>
    
    <img src={logo} className='p-1 md:w-21.25 w-19 ' />
</div>

<div>
    
</div>

</div>
        

        
</div>
    )
}

export default Navbar;