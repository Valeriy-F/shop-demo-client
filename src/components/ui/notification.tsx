import { IconClose } from './button';
import {
    CheckCircleOutline,
    ErrorOutline,
    InfoOutlined,
    WarningAmber
    } from '@mui/icons-material';
import {
    Alert as MuiAlert,
    AlertColor,
    AlertProps,
    AlertTitle,
    Box,
    Collapse
    } from '@mui/material';
import { closeSnackbar, SnackbarKey, SnackbarProvider as MuiSnackbarProvider } from 'notistack';
import { ReactNode, useState } from 'react';

type TAlert = AlertColor

type TAlertProps = {
    type: TAlert,
    text: string,
    title?: string
} & AlertProps

type TSnackbarProviderProps = {
    children: ReactNode | ReactNode[]
}

const Alert = (props: TAlertProps) => {
    const {
        type,
        text,
        title
    } = props

    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <MuiAlert
                    severity={type}
                    action={<IconClose handleClick={() => setOpen(false)} />}
                    {...props}
                >
                    {title && <AlertTitle>{title}</AlertTitle>}
                    {text}
                </MuiAlert>
            </Collapse>
        </Box>
    );
}

const SnackbarProvider = ({ children }: TSnackbarProviderProps) => {
    const IconWrapper = ({ children }: { children: ReactNode }) => {
        return (
            <Box sx={{ display: 'flex', padding: '0 10px 0 0' }}>
                {children}
            </Box>
        )
    }

    return (
        <MuiSnackbarProvider
            preventDuplicate
            iconVariant={{
                success: <IconWrapper><CheckCircleOutline /></IconWrapper>,
                error: <IconWrapper><ErrorOutline /></IconWrapper>,
                warning: <IconWrapper><WarningAmber /></IconWrapper>,
                info: <IconWrapper><InfoOutlined /></IconWrapper>,
            }}
            action={(snackbarId: SnackbarKey | undefined) => (
                <IconClose handleClick={() => closeSnackbar(snackbarId)} />
            )}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            TransitionProps={{ direction: 'down' }}
        >
            {children}
        </MuiSnackbarProvider>
    )
}

export { Alert, SnackbarProvider };

