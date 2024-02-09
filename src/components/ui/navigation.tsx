import { NavLink } from './link';
import NavigationContext from 'context/navigation-context';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    } from '@mui/material'

export type TNavigationMenuItemData = {
    href: string
    name: string
}

export default function Navigation() {
    const {navigationMenuData, navigationRightMenuData} = useContext(NavigationContext)
    const location = useLocation()

    return (
        <AppBar id='main-navbar' position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    {navigationMenuData.map(navigationMenuItemData => {
                        const { href, name } = navigationMenuItemData

                        return (
                            <NavLink
                                key={href}
                                href={href}
                                isActive={(location.pathname === href)}
                            >
                                {name}
                            </NavLink>
                        )
                    })}
                </Box>
                <Box>
                    {navigationRightMenuData.map(menuItem => menuItem)}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
