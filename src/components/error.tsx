import NotFoundException from 'api/exceptions/NotFoundException'
import Panel from './ui/panel'

type TErrorProps = {
    error?: Error
}

export default function Error({ error }: TErrorProps) {
    let errorMessage = 'Unknown error occurred'
    let errorDescription = 'Somthing went wrong :-('

    if (error instanceof NotFoundException) {
        errorMessage = 'Error 404'
        errorDescription = 'This page is not found.'
    }

    return (
        <div className='absolute top-1/2 left-1/2 w-[600px] h-[400px] -ml-[300px] -mt-[200px]'>
            <Panel>
                <div className='min-h-full grid align-middle'>
                    <div className='flex justify-center items-end py-4 text-4xl font-bold'>{errorMessage}</div>
                    <div className='flex justify-center py-4 text-2xl'>{errorDescription}</div>
                </div>
            </Panel>
        </div>
    )
}