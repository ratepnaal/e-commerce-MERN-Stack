import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/AuthContext';
import { useAlert } from "../components/useAlert";
import Alert from './Alert';


const AppMenu = () => {
  const { isSuccess, showAlert, subtitle, isVisible, triggerAlert } = useAlert();
  const {username , isAuthenticated , logout} = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // إذا كان الضغط خارج عنصر القائمة
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

       if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = ()=>{
    logout();
    navigate("/");
    setIsOpen(false);
    triggerAlert(true, "");
  }

  return (
    <div className="relative inline-block mr-7 z-50" ref={menuRef} >
     {isAuthenticated ? (
       <button 
        onClick={toggleMenu}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"
      >
        Options
        <span className={`ml-8 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
     ):<button className=" w-full mx-5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"
     onClick={()=>{navigate("/login")}}
     > Login </button>}
      
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition">
          <div className="py-1">
            <div className='text-center p-2 mb-2'>
<span className='text-gray-600 text-sm'>Signed in as <br/>
<div className='text-white font-bold text-sm '>{username} </div> </span>
            </div>
            <hr/>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
              xxxxxxxx
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
              xxxxxxxx
            </a>
              <button 
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                Log Out
              </button>
          </div>
        </div>
      )}
{showAlert && (
    <div className={`transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
        <Alert
            success={isSuccess}
            MainTitle={isSuccess ? "logout Successfully " : "Logout Failed "}
            SubTitle={subtitle}
        />
    </div>
)}

    </div>
  )
}

export default AppMenu;