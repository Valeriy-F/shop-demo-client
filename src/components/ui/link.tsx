import {
    Button,
    ButtonProps,
    Link as MuiLink,
    LinkProps,
    useTheme
    } from '@mui/material'
import { forwardRef, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type TLinkProps = {
    children: ReactNode,
    href: string,
} & LinkProps

type TNavLinkProps = {
    isActive?: boolean
} & TLinkProps

const LinkBehavior = forwardRef<any, Omit<TLinkProps, 'href'>>(
  (props, ref) => <Link ref={ref} href="/" {...props} role={undefined} />,
);

const Link = (props: TLinkProps) => {
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

const NavLink = (props: TNavLinkProps) => {
    const {children, href, isActive, ...otherProps } = props
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

const ButtonLink = (props: ButtonProps) => {
    const {children, ...otherProps} = props

    return (
        <Button component={LinkBehavior} {...otherProps}>{children}</Button>
    )
}

export { ButtonLink, Link, NavLink }
export type { TLinkProps, TNavLinkProps }
