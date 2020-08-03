import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { sendReminder } from '../redux/ActionCreators';
import ErrorMessage from './ErrorMessageComponent';

const ReminderModal = ({ open, setOpen, borrowId }) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            header: '',
            message: ''
        },
        validationSchema: Yup.object({
            header: Yup.string().required('Subject of Reminder is Required!'),
            message: Yup.string().required('Message of Reminder is Required!')
        }),
        onSubmit: values => { dispatch(sendReminder(borrowId, values)); setOpen(false); },
        onReset : values => {
            values.header = '';
            values.message = '';
        }
    });
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="send-reminder"> Send Reminder </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Send a gentle reminder to return your property back to you.
                </DialogContentText>
                <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <Box margin={1}>
                        <TextField
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.header}
                            error={formik.touched.header && formik.errors.header ? true : false}
                            label={'Enter Subject'}
                            variant="outlined"
                            name="header"
                            id="header"
                            fullWidth
                        />
                        {formik.touched.header && formik.errors.header ? <ErrorMessage message={formik.errors.header} /> : <React.Fragment />}
                    </Box>
                    <Box margin={1}>
                        <TextField
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            error={formik.touched.message && formik.errors.message ? true : false}
                            label={'Enter Message'}
                            variant="outlined"
                            name="message"
                            id="message"
                            fullWidth
                            multiline
                            rows={3}
                            rowsMax={4}
                        />
                        {formik.touched.message && formik.errors.message ? <ErrorMessage message={formik.errors.message} /> : <React.Fragment />}
                    </Box>
                    <Box margin={3}>
                        <Button type="submit" variant="contained" color="primary" style={{ width : '40%'}}> Send </Button>
                        <Button type="reset" variant="outlined" color="error" style={{ width : '40%', marginLeft : '20%'}}> Reset </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ReminderModal;