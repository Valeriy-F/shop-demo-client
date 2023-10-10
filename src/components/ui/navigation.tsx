import { Link, useLocation } from 'react-router-dom'

export type TNavLinkData = {
    id: string
    path: string
    name: string
}

export type TNavigationProps = {
    navLinksData: TNavLinkData[],
}

export default function Navigation({ navLinksData }: TNavigationProps) {
    const location = useLocation()

    return (
        <nav className='bg-current-800'>
            <ul className='flex flex-row justify-start '>
                {navLinksData.map(navLinkData => {
                    let isActive = (location.pathname === navLinkData.path) 

                    return (
                        <li key={navLinkData.id} className={`px-5 py-3 text-current-100 hover:bg-current-600 ${isActive && 'bg-current-700'}`}>{
                            <Link to={navLinkData.path}>
                                {navLinkData.name}
                            </Link>
                        }</li>
                    )
                })}
            </ul>
        </nav>
    )
}