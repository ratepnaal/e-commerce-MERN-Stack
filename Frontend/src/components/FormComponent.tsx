 interface params {
    text : string;
    type : string;
    placeholder:string;
 }
 
 const FormComponent = ({text , type , placeholder }: params)=>{
    return(
<>
<div className=" flex flex-col items-center mt-2 ">
        <label className=" font-semibold text-lg text-blue-700 ">{text}</label>
        <input
         className="border-2 border-blue-300 hover:border-blue-500 p-0.5 rounded-lg shadow-2xl hover:scale-105 min-w-60 mt-5  "
         type={type}
         placeholder={placeholder}
         ></input>
</div>
</>
    );
}
export default FormComponent