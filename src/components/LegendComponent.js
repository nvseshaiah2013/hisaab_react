import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles((theme) => ({
    root:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        padding : '0.8rem 0'
    },
    redDot: {
        backgroundColor: red[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        padding : '0.8rem 0'
    },
    indigoDot: {
        backgroundColor: indigo[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        padding : '0.8rem 0'
    },
    orangeDot: {
        backgroundColor: orange[500],
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign : 'middle',
        padding : '0.8rem 0'
    },
    padding : {
        padding : '0.8rem 0'
    }
}));


const Legend = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="body2" className={classes.padding}> Accepted <span className={classes.greenDot} />
            </Typography>
            <Typography variant="body2" className={classes.padding}> Request Pending <span className={classes.orangeDot} />
            </Typography>
            <Typography variant="body2" className={classes.padding}> Rejected <span className={classes.redDot} />
            </Typography>
            <Typography variant="body2" className={classes.padding}> Returned <span className={classes.indigoDot} />
            </Typography>
        </Container>
    );
}

export default Legend;