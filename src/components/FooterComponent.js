import React from 'react';
import { Container,Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        zIndex : 1201,
        position : 'auto'
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl" className={classes.root}>
            <Box className={classes.root}>Sample Footer Goes Here</Box>
        </Container>
    );
}

export default Footer;