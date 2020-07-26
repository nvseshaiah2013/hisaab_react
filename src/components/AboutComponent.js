import React from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
    root : {
        padding : theme.spacing(3)
    }
}));

const About = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography variant="h4" align="center">About Us</Typography>
            <Button type="button" endIcon={<GitHubIcon />} variant="contained"> View Source Code </Button>
        </Container>
    );
}

export default About;