import { useRef } from "react";
import { SubmitButton } from "../components/Buttons";
import FormComponent from "../components/FormComponent";
import { BASE_URL } from "../constant/baseurl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAlert } from "../components/useAlert";


 const LoginPage = ()=>{

    const { isSuccess, showAlert, subtitle, isVisible, triggerAlert } = useAlert();
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {login} = useAuth();
    const navigate = useNavigate()
    
    const OnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        event.preventDefault();

        if( !password || !email){
            triggerAlert(false, "Please fill in all fields!");
            return
        }

        const response = await fetch(`${BASE_URL}/users/login` ,{ 
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
     } )
     if(!response.ok){
        triggerAlert(false, "Email or Password is incorrect");
return;
     }
     if(response.ok){
       triggerAlert(true, "You Are Welcome in Your Account");        
     }
     const token = await response.json();

     if(!token){
       triggerAlert(false, "Invalid Token!");
        return
     }

    setTimeout(() => {
                login(email, token);
                navigate("/");
            }, 1500);

    }
    return(
<>
<div className="flex flex-col items-center mt-8">

    <div>
<h1 className="font-semibold text-2xl">Login</h1>
    </div>


<div className="border-2 border-blue-500 h-auto md:min-w-2/4 min-w-3/4 m-8 p-3 rounded-lg  ">

    <form>

    <FormComponent text={"Email : "} type={"email"} placeholder={"Enter Your Email Here .. "} ref={emailRef}/>

    <FormComponent text={"Password : "} type={"password"} placeholder={"Enter Your Password Here .. "} ref={passwordRef}/>

    <SubmitButton text={"Log In "} OnSubmit={OnSubmit}/> 
  
  <h5 className="text-center text-xs"> Don't Have Account ? <b></b>
     <button onClick={()=>{navigate("/register")}}
     className="text-blue-600 hover:scale-105"
     > Sign in </button> </h5>
    </form>
   
</div>

{showAlert && (
    <div className={`transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
        <Alert
            success={isSuccess}
            MainTitle={isSuccess ? "Success Login !" : "Error Login !"}
            SubTitle={subtitle}
        />
    </div>
)}


</div>
</>
    )
}
export default LoginPage;