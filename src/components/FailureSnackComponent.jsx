import React from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.error.main,
        color: 'white',
        fontWeight : 'bolder'
    },
    icon: {
        color: 'white',
        margin: '0 0.3rem'
    }
}));

const FailureSnack = ({ message, open, setOpen }) => {
    const classes = useStyles();
    return (
        <Snackbar open={open && message !== null} onClose={() => setOpen(false)}>
            <div className={classes.content}> <HighlightOffTwoToneIcon className={classes.icon} />
                <Typography variant="body1" display="inline" >
                    {message}
                </Typography>
            </div>
        </Snackbar>
    );
}
export default FailureSnack;