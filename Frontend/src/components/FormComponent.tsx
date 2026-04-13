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
<div className="mt-4 flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-700">{text}</label>
        <input
     className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
         type={type}
         placeholder={placeholder}
         ref={ref}
         ></input>
</div>
</>
    );
}
export default FormComponent