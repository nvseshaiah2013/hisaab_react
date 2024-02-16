import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import {makeStyles } from '@mui/styles';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        fontWeight : 'bolder'
    },
    icon: {
        color: 'white',
        margin: '0 0.3rem'
    }
}));

const SuccessSnack = ({ message, open, setOpen }) => {
    const classes = useStyles();
    return (
        <Snackbar open={open && message !== null} onClose={() => setOpen(false)} anchorOrigin={{ vertical : 'bottom', horizontal : 'center'}}>
            <div className={classes.content}> <DoneOutlineOutlinedIcon className={classes.icon} /><Typography variant="body1" display="inline" >
                    {message}
                </Typography></div>
        </Snackbar>
    );
}
export default SuccessSnack;