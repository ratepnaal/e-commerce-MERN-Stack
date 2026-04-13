import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/AuthContext';
import { useAlert } from "../components/useAlert";


const AppMenu = () => {
  const { triggerAlert } = useAlert();
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
    triggerAlert(true, "You have been logged out safely.", "Logged Out");
  }

  return (
    <div className="relative inline-block z-50" ref={menuRef} >
     {isAuthenticated ? (
       <button 
        onClick={toggleMenu}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
      >
        Options
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
     ):<button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
     onClick={()=>{navigate("/login")}}
     > Login </button>}
      
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-1 shadow-xl transition">
          <div className="py-1">
            <div className='text-center p-2 mb-2'>
<span className='text-slate-500 text-sm'>Signed in as <br/>
<div className='text-slate-800 font-bold text-sm '>{username} </div> </span>
            </div>
            <hr/>
            <button
              onClick={()=>{navigate('/my-orders'); setIsOpen(false);}}
              className="block w-full rounded-xl px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              My Orders
            </button>
              <button 
              onClick={handleLogout}
              className="block w-full rounded-xl px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                Log Out
              </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppMenu;