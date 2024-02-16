import React from 'react';
import Container from '@mui/material/Container';
import {makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    heading: {
        position : 'relative',
        '&:after' : {
            content: '""', 
            display: 'block', 
            margin: '0 auto', 
            width: '50%', 
            paddingTop: '20px', 
            borderBottom: `3px solid ${theme.palette.info.dark}`,
            transition : '0.5s'
        },
        '&:hover:after' : {
            width : '20%'
        }
    }
}));

const Heading = ({ heading }) => {
    const classes = useStyles();
    return (
        <Container>
            <Typography variant="h4" align="center" display="block" className={classes.heading}>{heading}</Typography>
        </Container>
    );
}

export default Heading;