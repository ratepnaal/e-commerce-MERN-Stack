interface button {
    text : string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    OnSubmit : any
}
export const SubmitButton = ({text , OnSubmit}:button)=>{
    return(
<>
  <div className="mt-6 flex flex-col items-center">
        <button type="submit" className="w-full rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
        onClick={OnSubmit}
        >
            {text}
        </button>

    </div>
</>
    );
}