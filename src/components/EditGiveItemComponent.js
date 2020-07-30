import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, Box } from '@material-ui/core';
import GiveItemForm from './GiveItemComponent';

const EditGiveItem = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="title"> Edit Give Item Request </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit your give item request. Post accepting of the give item request by the other party no modifications will be allowed furthur.
                    So, update carefully.
                </DialogContentText>
                <Box marginBottom={3}>
                 <GiveItemForm />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default EditGiveItem;