import Card, { TCardProps } from './ui/card';
import { Typography } from '@mui/material';
import NotFoundException from 'api/exceptions/NotFoundException';

type TErrorProps = {
    error?: Error | number
}

const Error = ({ error }: TErrorProps) => {
    let errorMessage = 'Unknown error occurred'
    let errorDescription = 'Somthing went wrong :-('

    if (error === 404 || error instanceof NotFoundException) {
        errorMessage = 'Error 404'
        errorDescription = 'This page is not found.'
    }

    const content = (<>
        <Typography gutterBottom variant="h5" component="div" sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        }}>
            {errorMessage}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        }}>
            {errorDescription}
        </Typography>
    </>)

    const cardProps: TCardProps = {
        content
    }

    return <Card {...cardProps} />
}

export default Error
export {type TErrorProps}
