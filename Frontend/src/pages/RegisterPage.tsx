import { useRef } from "react";
import { SubmitButton } from "../components/Buttons";
import FormComponent from "../components/FormComponent";
import { BASE_URL } from "../constant/baseurl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../components/useAlert";

 const RegisterPage = ()=>{
    
const { triggerAlert } = useAlert();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const {login} = useAuth();
    const navigate = useNavigate()
    const OnSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        event.preventDefault();

        if(!firstName || !lastName || !password || !email){
            triggerAlert(false, "Please fill in all fields!");
            return
        }

        const response = await fetch(`${BASE_URL}/users/register` ,{ 
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                firstName,
                lastName,
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
     }

setTimeout(() => {
                login(email, token);
                navigate("/");
            }, 1500);}
    return(
<>
<div className="mx-auto mt-8 w-[94%] max-w-5xl">
    <section className="section-shell relative overflow-hidden rounded-3xl p-5 md:p-8">
        <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-teal-200/35 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-slate-300/25 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Create account</p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Join Technical Store</h1>
                <p className="mt-3 text-sm text-slate-600">
                    Register once to track orders, save cart items, and finish checkout faster.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg">
                <form>
                    <FormComponent text={"Email"} type={"email"} placeholder={"you@example.com"} ref={emailRef}/>
                    <FormComponent text={"First Name"} type={"text"} placeholder={"Your first name"} ref={firstNameRef} />
                    <FormComponent text={"Last Name"} type={"text"} placeholder={"Your last name"} ref={lastNameRef}/>
                    <FormComponent text={"Password"} type={"password"} placeholder={"Create a secure password"} ref={passwordRef}/>
                    <SubmitButton text={"Create Account"} OnSubmit={OnSubmit}/>
                </form>
            </div>
        </div>
    </section>
</div>

</>
    )}

export default RegisterPage;