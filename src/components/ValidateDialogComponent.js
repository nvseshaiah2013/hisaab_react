import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Box } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexCell: {
        flexGrow: 1
    }
}));


const ValidateDialog = ({ open, setOpen }) => {
    const classes = useStyles();
    const formik = useFormik(
        {
            initialValues: { secretToken: '' },
            validationSchema: Yup.object({
                secretToken: Yup.string().required('The secret token is required!')
                    .length(9, 'Token should be of 9 characters only!')
            })
        }
    );
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="borrow-validation"> Borrow Validation </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the Secret Token given by the Other Party involved in the current transaction.
                    The token is valid only for 2 minutes.
                    A new token needs to be generated in case the time expires.
                </DialogContentText>
                <Box margin={2}>
                    <form noValidate onSubmit={formik.handleSubmit} className={classes.flex}>
                        <Box className={classes.flexCell}>
                            <TextField
                                id="secretToken"
                                name="secretToken"
                                label="Enter Secret Token"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.secretToken}
                                onBlur={formik.handleBlur}
                                error={formik.touched.secretToken && formik.errors.secretToken ? true : false}
                            />
                            {formik.touched.secretToken && formik.errors.secretToken ? <div>{formik.errors.secretToken}</div> : <React.Fragment />}
                        </Box>
                        <Button variant="contained" color="primary" type="submit" className={classes.flexCell}> Send Secret </Button>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type="button" variant="outlined" color="primary"> Resend Code </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ValidateDialog;