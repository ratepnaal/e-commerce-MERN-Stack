import { FaCartPlus } from "react-icons/fa";
import AppMenu from './AppMenu';
import { useNavigate } from 'react-router-dom';
import logo from '../photos/logo.png';



const Navbar = ()=>{
const navigate = useNavigate();
    return(
<div className=" h-18 bg-cyan-500 rounded-3xl mx-3 my-2 hover:scale-101 duration-300 delay-150 relative z-50  ">
          
<div className='flex justify-between items-center px-5 py-2 '>

{/*القسم اليميني (الكتابة )*/}

<div className='flex justify-start'>
    <h1 className='md:text-xl text-lg font-extrabold text-gray-600'> Technical Store </h1>
</div>

{/*القسم الأوسط   */}
  <div className='flex-1 '>
    <div className='flex justify-end text-white text-2xl'>
 <button
 onClick={()=>{navigate('/cart')}}
 className=' hover:scale-110 '>
<FaCartPlus />
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