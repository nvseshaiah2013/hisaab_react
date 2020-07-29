import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content : {
        padding : theme.spacing(3)
    },
    header: {
        borderBottom: `3px solid ${theme.palette.info.dark}`,
        marginBottom: '1rem',
        paddingBottom: '1rem'
    }
}));

const Reminders = () => {
    const classes  = useStyles();
    return (
        <Container maxWidth="md" className={classes.content}>
            <Typography variant="h4" align="center" className={classes.header}> My Reminders </Typography>
        </Container>
    );
};

export default Reminders;