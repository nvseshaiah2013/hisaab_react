import React from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.error.main,
        color: 'white',
    },
    icon: {
        color: 'white',
        margin: '0 0.3rem'
    }
}));

const FailureSnack = ({ message, open, setOpen }) => {
    const classes = useStyles();
    if (open) {
        setTimeout(() => setOpen(false), 3000);
    }
    return (
        <Snackbar open={open}>
            <div className={classes.content}> <HighlightOffTwoToneIcon className={classes.icon} />
                <Typography variant="body1" display="inline" >
                    {message}
                </Typography>
            </div>
        </Snackbar>
    );
}
export default FailureSnack;