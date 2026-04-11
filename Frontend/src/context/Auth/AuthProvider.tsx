import {type FC , type PropsWithChildren, useState} from 'react'
import { AuthContext } from './AuthContext';

const USENAME_KEY = 'username';
const TOKEN_KEY = 'token';

const AuthProvider : FC<PropsWithChildren> = ({children})=>{
const [username , setUsername] = useState<string | null>(localStorage.getItem(USENAME_KEY));
const [token , setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

const login = (username:string , token:string)=>{
setUsername(username);
setToken(token);
localStorage.setItem(USENAME_KEY , username);
localStorage.setItem(TOKEN_KEY , token)
}

const logout = ()=>{
    localStorage.removeItem(USENAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUsername(null);
    setToken(null);
}

const isAuthenticated = !!token

return(
    <>
    <AuthContext.Provider value={{username , token ,  isAuthenticated , login , logout}}>
        {children}
    </AuthContext.Provider>
    </>
)
}

export default AuthProvider