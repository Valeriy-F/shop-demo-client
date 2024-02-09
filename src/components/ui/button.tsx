import { Close } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'

const IconClose = ({ onClick }: IconButtonProps) => {
    return (
        <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
        >
            <Close fontSize="inherit" />
        </IconButton>
    )
}

export { IconClose }
