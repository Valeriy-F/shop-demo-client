type TButtonProps = {
    name: string,
    type?: 'button' | 'submit' | 'reset',
    className?: string
}

export default function Button({ name, type='button', className }: TButtonProps) {
    return (
        <button type={type} className={`bg-current-700 hover:bg-current-600 border border-current-800 rounded px-2 py-1 text-current-100 ${className}`}>{name}</button>
    )
}
