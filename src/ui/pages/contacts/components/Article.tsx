import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Actions} from "./Actions";
import {Avatar, Grid} from '@mui/material';
import {ContactType} from "../../../../api/api";

type ContactPropsType = {
    contact: ContactType
}

export const Article = ({contact}: ContactPropsType) => {
    const {name, number} = JSON.parse(contact.name)
    return (<Card sx={{width: 345, marginTop: '30px'}}>
            <Avatar variant="rounded" style={{backgroundColor: '#1976d2'}} src={contact.deckCover as string}
                    sx={{width: '100%', height: 210,}}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {number}
                </Typography>
                <Grid container
                      justifyContent="flex-end">
                    <Actions id={contact._id} name={contact.name} cover={contact.deckCover}/>
                </Grid>
            </CardContent>
        </Card>
    )
}