import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Button, Box } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const ReminderModal = ({open, setOpen}) => {
    const formik = useFormik({
        initialValues : { 
            header  : '',
            message  : ''
        },
        validationSchema : Yup.object({
            header  : Yup.string().required('Subject of Reminder is Required!'),
            message : Yup.string().required('Message of Reminder is Required!')
        }),
        onSubmit : values => alert('Submitted')
    });
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="send-reminder"> Send Reminder </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Send a gentle reminder to return your property back to you.
                </DialogContentText>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <TextField 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.header}
                        error={formik.touched.header && formik.errors.header ? true : false}
                        label={'Enter Subject'}
                        variant="outlined"
                        name="header"
                        id="header"                    
                    />
                    {formik.touched.header && formik.errors.header ? <div>{formik.errors.header}</div> : <React.Fragment />}
                    <TextField 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        error={formik.touched.message && formik.errors.message ? true : false}
                        label={'Enter Message'}
                        variant="outlined"
                        name="message"
                        id="message"                    
                    />
                    {formik.touched.message && formik.errors.message ? <div>{formik.errors.message}</div> : <React.Fragment />}
                    <Box marginLeft={3} marginRight={3}>                        
                        <Button type="submit" variant="contained"> Send </Button> 
                        <Button type="reset" variant="outlined"> Reset </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ReminderModal;