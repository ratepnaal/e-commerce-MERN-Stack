interface AlertType {
    success:boolean;
    MainTitle:string;
    SubTitle:string;
} 
 
 const Alert = ({success , MainTitle , SubTitle}:AlertType)=>{
return (
    <>
  <div className={`${success ? "bg-teal-50 border-teal-500" :"bg-red-50 border-red-500" } border-t-2  rounded-lg p-4 `} role="alert" tabIndex={-1} aria-labelledby="hs-bordered-success-style-label">
    <div className="flex">
      <div className="shrink-0">
        {/* Icon */}
        <span className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${success ? "border-teal-100 bg-teal-200 text-teal-800 " : " border-red-100 bg-red-200 text-red-800"} `}>
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={`${success ? "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" : "M18 6 6 18"} `}/><path d={`${success? "m9 12 2 2 4-4" : "m6 6 12 12"}`}/>  </svg> 
        </span>
        {/* End Icon */}
      </div>
      <div className="ms-3">
        <h3  className="text-foreground font-semibold">
          {MainTitle}
        </h3>
        <p className="text-sm text-foreground">
         {SubTitle}
        </p>
      </div>
    </div>
  </div>
    </>
)
}

export default Alert;