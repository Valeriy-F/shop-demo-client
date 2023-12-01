import Card, { TCardProps } from './ui/card'
import { Typography } from '@mui/material'
import { ResponseError } from 'model/error'

type TErrorProps = {
    error: ResponseError
}

const Error = ({ error }: TErrorProps) => {
    let errorMessage = 'Unknown error occurred'
    let errorDescription = 'Somthing went wrong :-('

    if (error.status && error.status >= 300 && error.status < 500) {
        errorMessage = `Error ${error.status}`
        errorDescription = error.message || error.statusText || errorDescription
    }

    const content = (<>
        <Typography gutterBottom variant="h5" component="div" color='secondary' sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        }}>
            {errorMessage}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{
            display: 'flex',
            justifyContent: 'center'
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
