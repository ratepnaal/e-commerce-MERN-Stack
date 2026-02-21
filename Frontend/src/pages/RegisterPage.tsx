import { SubmitButton } from "../components/Buttons";
import FormComponent from "../components/FormComponent";

 const RegisterPage = ()=>{
    return(
<>
<div className="flex flex-col items-center mt-8">

    <div>
<h1 className="font-semibold text-2xl">Registration</h1>
    </div>


<div className="border-2 border-blue-500 h-auto md:min-w-2/4 min-w-3/4 m-8 p-3 rounded-lg  ">

    <form>

    <FormComponent text={"Email : "} type={"email"} placeholder={"Enter Your Email Here .. "}/>

    <FormComponent text={"First Name :"} type={"text"} placeholder={"Enter Your First Name Here .. "}/>

    <FormComponent text={"Last Name : "} type={"text"} placeholder={"Enter Your Last Name Here .. "}/>

    <FormComponent text={"Password : "} type={"password"} placeholder={"Enter Your Password Here .. "}/>

    <SubmitButton text={"Sign In "}/>
  
    </form>
   
</div>


</div>
</>
    )
}
export default RegisterPage;