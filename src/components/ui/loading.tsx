import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{
            padding: '8px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <CircularProgress size={25} />
            <Typography color='primary' variant='body2' sx={{
                padding: '0 8px'
            }}>Loading...</Typography>
        </Box>
    )
}

export { Loading };

