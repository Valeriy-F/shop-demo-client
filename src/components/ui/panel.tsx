import { ReactNode } from 'react'

type TPanelProps = {
    children?: ReactNode
}

export default function Panel({ children }: TPanelProps) {
    return (
        <div className="bg-current-50 border border-current-800 rounded-lg p-4">
            {children}
        </div>
    )
}