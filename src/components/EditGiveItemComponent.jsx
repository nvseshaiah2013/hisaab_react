import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
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