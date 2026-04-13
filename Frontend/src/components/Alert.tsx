interface AlertType {
    success:boolean;
    MainTitle:string;
    SubTitle:string;
    onClose?:()=>void;
} 
 
 const Alert = ({success , MainTitle , SubTitle, onClose}:AlertType)=>{
return (
  <div
    className={`${success ? "border-emerald-200 bg-emerald-50/95" :"border-rose-200 bg-rose-50/95" } relative overflow-hidden rounded-2xl border p-4 shadow-lg backdrop-blur-sm`}
    role="alert"
  >
    <div className="flex items-start gap-3">
      <div className="shrink-0">
        <span className={`inline-flex size-8 items-center justify-center rounded-full ${success ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={success ? "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" : "M18 6 6 18"}/>
            <path d={success ? "m9 12 2 2 4-4" : "m6 6 12 12"}/>
          </svg>
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {MainTitle}
        </h3>
        <p className="text-sm text-slate-600">
          {SubTitle}
        </p>
      </div>
      <button
        onClick={onClose}
        className="rounded-md p-1 text-slate-400 transition hover:bg-white/80 hover:text-slate-700"
        aria-label="close toast"
      >
        ✕
      </button>
    </div>

    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/70">
      <div
        className={`h-full ${success ? "bg-emerald-500" : "bg-rose-500"} animate-[toast-bar_3s_linear_forwards]`}
      />
    </div>
  </div>
)
}

export default Alert;