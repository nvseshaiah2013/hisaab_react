import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import GiveItemForm from './GiveItemComponent';

const EditGiveItem = ({ open, setOpen, borrowId, occasion, itemName, description, expected_return_date, place }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="title"> Edit Give Item Request </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit your give item request. Post accepting of the give item request by the other party no modifications will be allowed furthur.
                    So, update carefully.
                </DialogContentText>
                <Box marginBottom={3}>
                    <GiveItemForm
                        setOpen={setOpen}
                        borrowId={borrowId}
                        occasion={occasion}
                        itemName={itemName}
                        description={description}
                        expected_return_date={expected_return_date}
                        place={place}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default EditGiveItem;