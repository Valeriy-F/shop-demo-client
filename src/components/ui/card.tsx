import { Link } from './link';
import {
    Box,
    Card as MuiCard,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
    } from '@mui/material';
import { ReactNode } from 'react';

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
    content: ReactNode,
    actionAreaUrl?: string,
    actionsData?: TCardActionsData
    mediaData?: TCardMediaData,
}

const Card = (props: TCardProps) => {
    const { actionAreaUrl, actionsData, content, mediaData } = props

    const cardMediaBlock = mediaData ? <CardMedia
        component={mediaData.component}
        src={mediaData.src}
        height={mediaData.height || '240'}
        alt={mediaData.alt}
    /> : <></>

    const cardContent = <CardContent>{content}</CardContent>

    const cardBody = actionAreaUrl
        ? (
            <CardActionArea sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <Link href={actionAreaUrl} sx={{
                    height: '100%',
                    textDecoration: 'none'
                }}>
                    {cardMediaBlock}
                    {cardContent}
                </Link>
            </CardActionArea>
        )
        : (<>
            {cardMediaBlock}
            {cardContent}
        </>)

    let actionsBlock = <></>

    if (actionsData) {
        const leftSide = actionsData.leftSide ? <Box>{actionsData.leftSide}</Box> : <></>
        const rightSide = actionsData.rightSide ? <Box>{actionsData.rightSide}</Box> : <></>

        actionsBlock = (
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {leftSide}
                {rightSide}
            </CardActions>
        )
    }

    return (
        <MuiCard sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '6px'
        }}>
            {cardBody}
            {actionsBlock}
        </MuiCard>
    )
}

export default Card
export {type TCardProps, type TCardMediaData, type TCardActionsData}
