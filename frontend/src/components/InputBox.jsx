//child
export function InputBox({label,placeholder,onChange}){
    
    return <div className="texts-sm font-weight:bold text-left py-2">
          {label}
          <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded"></input>

    </div>
   
}