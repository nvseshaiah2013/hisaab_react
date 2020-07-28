import React from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.success.dark,
        color: 'white',
    },
    icon: {
        color: 'white',
        margin: '0 0.3rem'
    }
}));

const SuccessSnack = ({ message, open, setOpen }) => {
    const classes = useStyles();
    if (open) {
        setTimeout(() => setOpen(false), 5000);
    }
    return (
        <Snackbar open={open}>
            <div className={classes.content}> <DoneOutlineOutlinedIcon className={classes.icon} /><Typography variant="body1" display="inline" >
                    {message}
                </Typography></div>
        </Snackbar>
    );
}
export default SuccessSnack;