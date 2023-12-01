import { Add as AddIcon } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { MouseEventHandler } from 'react'

type TProductAddButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

const ProductAddButton = ({ onClick, disabled = false }: TProductAddButtonProps) => {
    return (
        <Fab
            size='medium'
            color="secondary"
            aria-label="add"
            disabled={disabled}
            onClick={onClick}
            sx={{boxShadow: 0}}
        >
            <AddIcon />
        </Fab>
    )
}

export { ProductAddButton }

