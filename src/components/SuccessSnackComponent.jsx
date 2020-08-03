import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';

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
        <Snackbar open={open && message !== null} onClose={() => setOpen(false)}>
            <div className={classes.content}> <DoneOutlineOutlinedIcon className={classes.icon} /><Typography variant="body1" display="inline" >
                    {message}
                </Typography></div>
        </Snackbar>
    );
}
export default SuccessSnack;