import logo from '../photos/pngfind.com-ecommerce-png-290389 (2).png'
import AppMenu from './AppMenu';


const Navbar = ()=>{

    return(
<div className=" h-18 bg-cyan-500 rounded-3xl mx-3 my-2 hover:scale-101 duration-300 delay-150 relative z-50  ">
          
<div className='flex justify-between items-center px-5 py-2 '>

{/*القسم اليميني (الكتابة )*/}

<div className='flex justify-start'>
    <h1 className='md:text-xl text-lg font-extrabold text-gray-600'> Technical Store </h1>
</div>

{/* القسم الأوسط - فارغ لموازنة التوزيع */}
  <div className='flex-1'></div>    

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