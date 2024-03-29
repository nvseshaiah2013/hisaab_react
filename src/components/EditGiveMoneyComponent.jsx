import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import GiveMoneyForm from './GiveMoneyComponent';


const EditGiveMoney = ({ open, setOpen, borrowId, occasion, amount, place, expected_return_date }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="title"> Edit Give Money Request </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit your give money request. Post accepting of the give money request by the other party no modifications will be allowed furthur.
                    So, update carefully.
                </DialogContentText>
                <Box marginBottom={3}>
                    <GiveMoneyForm
                        borrowId={borrowId}
                        occasion={occasion}
                        place={place}
                        expected_return_date={expected_return_date}
                        amount={amount}
                        setOpen={setOpen}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default EditGiveMoney;