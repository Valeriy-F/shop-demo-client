import { Link } from './link'
import {
    Box,
    Card as MuiCard,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
    } from '@mui/material'
import { ReactNode } from 'react'

type TCardMediaData = {
    component: 'img' | 'video' | 'audio' | 'picture' | 'iframe',
    src: string,
    height?: string,
    alt?: string
}

type TCardActionsData = {
    leftSide?: ReactNode,
    rightSide?: ReactNode
}

type TCardProps = {
    content: JSX.Element,
    beforeContent?: JSX.Element,
    actionAreaUrl?: string,
    actionsData?: TCardActionsData
    mediaData?: TCardMediaData,
}

const Card = (props: TCardProps) => {
    const {
        actionAreaUrl,
        actionsData,
        beforeContent,
        content,
        mediaData
    } = props

    const cardBodyGuts = (<>
        {mediaData && (
            <CardMedia
                component={mediaData.component}
                image={mediaData.src}
                height={mediaData.height || '240'}
                alt={mediaData.alt}
            />
        )}
        {beforeContent}
        <CardContent>{content}</CardContent>
    </>)

    const cardBody = actionAreaUrl
        ? (
            <CardActionArea sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <Link href={actionAreaUrl} sx={{
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none'
                }}>
                    {cardBodyGuts}
                </Link>
            </CardActionArea>
        )
        : (<>{cardBodyGuts}</>)

    return (
        <MuiCard sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '6px'
        }}>
            {cardBody}
            {actionsData && (
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px'
                }}>
                    <Box>{actionsData.leftSide}</Box>
                    <Box>{actionsData.rightSide}</Box>
                </CardActions>
            )}
        </MuiCard>
    )
}

export default Card
export {type TCardProps, type TCardMediaData, type TCardActionsData}
