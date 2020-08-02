import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { generateToken, validateBorrow, validateReturn } from '../redux/ActionCreators';
import SuccessSnack from './SuccessSnackComponent';
import ErrorMessage from './ErrorMessageComponent';

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


const ValidateDialog = ({ open, setOpen, type, borrowId, page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ generated, setGenerated ] = useState(false);
    const code = useSelector(state => state.token.code);
    useEffect(() => {
        if(code === 201 ) {
            setGenerated(true);
        }
    },[code]);
    const handleSubmit = (values) => {
        if(type === 'return') {
            dispatch(validateReturn(values.secretToken,borrowId, page ));
        }
        else if(type === 'borrow') {
            dispatch(validateBorrow(values.secretToken,borrowId, page ));
        }
        setOpen(false);
    }

    const handleResend = () => {
        dispatch(generateToken(borrowId));
    }

    const formik = useFormik(
        {
            initialValues: { secretToken: '' },
            validationSchema: Yup.object({
                secretToken: Yup.string().required('The secret token is required!')
                    .length(9, 'Token should be of 9 characters only!')
            }),
            onSubmit : values => handleSubmit(values)
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
                <SuccessSnack open={generated} setOpen={setGenerated} message={'Token Generated!'}/>
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
                            {formik.touched.secretToken && formik.errors.secretToken ? <ErrorMessage message={formik.errors.secretToken}/>: <React.Fragment />}
                        </Box>
                        <Button variant="contained" color="primary" type="submit" className={classes.flexCell}> Send Secret </Button>
                    </form>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type="button" variant="outlined" color="primary" onClick={handleResend}> Resend Code </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ValidateDialog;