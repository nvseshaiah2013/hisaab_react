import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/ActionCreators';


const TokenDialog = ({open, setOpen, message }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
        dispatch(clearToken());
    }

    return (
        <Dialog open={open && message !== null} onClose={handleClose}>
            <DialogTitle> Secret Token </DialogTitle>
            <DialogContent>
                <DialogContentText color="primary">
                    Here is your secret Token :  
                    <span style={{fontWeight : 'bolder'}}> {message}</span> Only share with the concerned person.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button type="button" color="primary" size="large" variant="outlined" onClick={handleClose}> 
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TokenDialog;