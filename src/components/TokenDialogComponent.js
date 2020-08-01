import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
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