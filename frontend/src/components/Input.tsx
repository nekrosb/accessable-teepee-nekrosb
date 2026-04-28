type props = {
    type    : string,
    name    : string,
    inputClass: string,
    label: string,
placeholder: string,
}

export function Input({type, name, inputClass, label, placeholder}: props) {
    return (<>
            <label htmlFor={name} className="text-sm text-gray-600">{label}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} className={`border border-gray-300 rounded-md p-2 ${inputClass}`} />
            </>
    )
}