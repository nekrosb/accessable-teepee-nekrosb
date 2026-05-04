type props = {
    type    : string,
    name    : string,
    inputClass: string,
    label: string,
placeholder: string,
}

export function Input({type, name, inputClass, label, placeholder}: props) {
    return (
        <div style={{ marginBottom: 'var(--space-4)' }}>
            <label htmlFor={name} style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{label}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} className={`input ${inputClass || ''}`} />
        </div>
    )
}