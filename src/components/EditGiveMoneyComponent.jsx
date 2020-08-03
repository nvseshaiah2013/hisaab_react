import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
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