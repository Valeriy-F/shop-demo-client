import { Link as MuiLink, LinkProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export type TLinkProps = {
    children: ReactNode,
    href: string,
} & LinkProps

export type TNavLinkProps = {
    isActive?: boolean
} & TLinkProps

export const Link = (props: TLinkProps) => {
    const {children, href, ...otherProps} = props;

    return (
        <MuiLink
            component={RouterLink}
            to={href}
            sx={{
                textDecoration: 'none'
            }}
            {...otherProps}
        >
            {children}
        </MuiLink>
    )
}

export const NavLink = (props: TNavLinkProps) => {
    const {children, href, isActive, ...otherProps } = props;
    const theme = useTheme()

    return (
        <MuiLink
            component={RouterLink}
            to={href}
            variant='button'
            sx={{
                px: 2,
                color: isActive ? theme.palette.secondary.contrastText : 'inherit',
                '&:hover': {
                    color: theme.palette.secondary.contrastText
                },
                fontWeight: 'bold',
                textDecoration: isActive ? 'underline' : 'none'
            }}
            {...otherProps}
        >
            {children}
        </MuiLink>
    )
}
