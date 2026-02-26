interface button {
    text : string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    OnSubmit : any
}
export const SubmitButton = ({text , OnSubmit}:button)=>{
    return(
<>
  <div className="flex flex-col items-center m-8 ">
        
        <button type="submit" className="bg-blue-600 rounded-lg px-5 py-2 border-blue-400 font-semibold text-lg hover:scale-105 hover:bg-blue-900 transition duration-150 "
        onClick={OnSubmit}
        >
            {text}
        </button>

    </div>
</>
    );
}