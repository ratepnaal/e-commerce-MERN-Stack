 interface params {
    text : string;
    type : string;
    placeholder:string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref : any
 }
 
 const FormComponent = ({text , type , placeholder , ref }: params)=>{
    return(
<>
<div className=" flex flex-col items-center mt-2 ">
        <label className=" font-semibold text-lg text-blue-700 ">{text}</label>
        <input
         className="border-2 border-blue-300 hover:border-blue-500 p-0.5 rounded-lg shadow-2xl hover:scale-105 min-w-60 mt-5  "
         type={type}
         placeholder={placeholder}
         ref={ref}
         ></input>
</div>
</>
    );
}
export default FormComponent