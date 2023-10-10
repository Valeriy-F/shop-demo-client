import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export default function ButtonAddProduct(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement >) {
    return (
        <button
            title={props.title || 'Add new product'}
            className='w-16 h-16 bg-current-700 hover:bg-current-600 border border-current-800 rounded-[50%] p-1 text-current-100 text-3xl font-bold fixed bottom-3 right-3'
            {...props}
        >+</button>
    )
}