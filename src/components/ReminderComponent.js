import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content : {
        padding : theme.spacing(3)
    }
}));

const Reminders = () => {
    const classes  = useStyles();
    return (
        <Container maxWidth="md" className={classes.content}>
            <Typography variant="h4" align="center"> My Reminders </Typography>
        </Container>
    );
};

export default Reminders;