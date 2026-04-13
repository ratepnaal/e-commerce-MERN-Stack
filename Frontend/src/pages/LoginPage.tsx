import { useRef } from "react";
import { SubmitButton } from "../components/Buttons";
import FormComponent from "../components/FormComponent";
import { BASE_URL } from "../constant/baseurl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/useAlert";


 const LoginPage = ()=>{

     const { triggerAlert } = useAlert();
    
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
<div className="mx-auto mt-8 w-[94%] max-w-5xl">
    <section className="section-shell relative overflow-hidden rounded-3xl p-5 md:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-slate-300/30 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Welcome back</p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Log in to your account</h1>
                <p className="mt-3 text-sm text-slate-600">
                    Continue shopping with faster checkout and synced cart.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg">
                <form>
                    <FormComponent text={"Email"} type={"email"} placeholder={"you@example.com"} ref={emailRef}/>
                    <FormComponent text={"Password"} type={"password"} placeholder={"Enter your password"} ref={passwordRef}/>
                    <SubmitButton text={"Log In"} OnSubmit={OnSubmit}/>

                    <h5 className="mt-3 text-center text-xs text-slate-500">
                        Don't have an account?
                        <button
                            onClick={()=>{navigate("/register")}}
                            className="ml-1 font-semibold text-teal-700 transition hover:text-teal-800"
                        >
                            Register
                        </button>
                    </h5>
                </form>
            </div>
        </div>
    </section>
</div>
</>
    )
}
export default LoginPage;