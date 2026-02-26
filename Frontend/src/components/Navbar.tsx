import { useAuth } from '../context/Auth/AuthContext';
import logo from '../photos/pngfind.com-ecommerce-png-290389 (2).png'

const Navbar = ()=>{
const {username , token} = useAuth();
console.log('From Navbar : ' , {username , token})
    return(
<div className=" h-18 bg-cyan-500 rounded-3xl mx-3 my-2 hover:scale-101 duration-300 delay-150  ">
          
<div className='flex justify-between items-center px-5 py-2 '>

{/*القسم اليميني (الكتابة )*/}

<div className='text-right'>
    <h1 className='md:text-xl text-lg font-extrabold text-gray-600'> Technical Store </h1>
</div>

{/* القسم اليساري (اللوغو )*/}


<div >
    <img src={logo} className='p-1 md:w-21.25 w-19 ' />
</div>

</div>
        

        
</div>
    )
}

export default Navbar;