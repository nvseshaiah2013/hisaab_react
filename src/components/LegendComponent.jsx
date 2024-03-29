import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {makeStyles } from '@mui/styles';
import { red, indigo, green, orange } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
    root:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap : 'wrap'
    },
    greenDot: {
        backgroundColor: green[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        marginRight : '1rem'
    },
    redDot: {
        backgroundColor: red[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        marginRight : '1rem'
    },
    indigoDot: {
        backgroundColor: indigo[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        marginRight : '1rem'
    },
    orangeDot: {
        backgroundColor: orange[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        marginRight : '1rem'
    },
    padding : {
        padding : '0.8rem 0.8rem',
        margin : '0 auto'
    }
}));


const Legend = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="body2" className={classes.padding}> <span className={classes.greenDot} />Accepted 
            </Typography>
            <Typography variant="body2" className={classes.padding}><span className={classes.orangeDot} /> Pending 
            </Typography>
            <Typography variant="body2" className={classes.padding}> <span className={classes.redDot} />Rejected 
            </Typography>
            <Typography variant="body2" className={classes.padding}> <span className={classes.indigoDot} />Returned 
            </Typography>
        </Container>
    );
}

export default Legend;