import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';

type TIconCloseProps = {
    handleClick: MouseEventHandler
}

const IconClose = ({ handleClick }: TIconCloseProps) => {
    return (
        <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClick}
        >
            <Close fontSize="inherit" />
        </IconButton>
    )
}

export { IconClose }
