import { useRef, useState } from "react";
import { SubmitButton } from "../components/Buttons";
import FormComponent from "../components/FormComponent";
import { BASE_URL } from "../constant/baseurl";
import { useAuth } from "../context/Auth/AuthContext";


 const RegisterPage = ()=>{

    const [isSuccess , setisSuccess] = useState(true);
    const [error , setError] = useState("");

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const {login} = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const OnSubmit = async (event : any)=>{
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        event.preventDefault();

        if(!firstName || !lastName || !password || !email){
            setError(" Fill The Data in Form ! ")
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
        setError(" Sorry Cannot Register ! ")
        setisSuccess(false)
return;
     }
     if(response.ok){
        setError(" Register Succesfully ! ")
        setisSuccess(true);
     }
     const token = await response.json();

     if(!token){
        setError(' Invailed Token ! ')
     }

login(email , token)
    }
    return(
<>
<div className="flex flex-col items-center mt-8">

    <div>
<h1 className="font-semibold text-2xl">Registration</h1>
    </div>


<div className="border-2 border-blue-500 h-auto md:min-w-2/4 min-w-3/4 m-8 p-3 rounded-lg  ">

    <form>

    <FormComponent text={"Email : "} type={"email"} placeholder={"Enter Your Email Here .. "} ref={emailRef}/>

    <FormComponent text={"First Name :"} type={"text"} placeholder={"Enter Your First Name Here .. "} ref={firstNameRef} />

    <FormComponent text={"Last Name : "} type={"text"} placeholder={"Enter Your Last Name Here .. "} ref={lastNameRef}/>

    <FormComponent text={"Password : "} type={"password"} placeholder={"Enter Your Password Here .. "} ref={passwordRef}/>

    <SubmitButton text={"Sign In "} OnSubmit={OnSubmit}/> 

    {error && <div className= {`font-semibold text-sm text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>{error}</div>}
  
    </form>
   
</div>


</div>
</>
    )
}
export default RegisterPage;