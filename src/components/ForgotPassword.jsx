import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import ErrorMessage from './ErrorMessageComponent';
import SuccessSnack from './SuccessSnackComponent';
import FailureSnack from './FailureSnackComponent';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { requestForgotPasswordLink } from '../redux/ActionCreators';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: '3px solid blue',
    },
    box: {
        border: '2px solid gray',
        margin: '20vh auto',
        padding: '1rem 2rem',
        borderRadius: '5px',
        boxShadow: theme.shadows[2]
    },
}))

const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const state = useSelector(state => state.signup);
    React.useEffect(() => {
        if (state.status === true) {
            setSuccess(true);
            setMessage(state.message);
        }
        else if (state.status === false) {
            setFailure(true);
            setMessage(state.message);
        }
    }, [state]);
    const formik = useFormik({
        initialValues: { username: ' ' },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Email Address is Required')
                .email('Username should be valid email id')
        }),
        onSubmit: (values, {setSubmitting, resetForm}) => {
            dispatch(requestForgotPasswordLink(values.username));
            setSubmitting(false);
            resetForm();
        }
    });
    return (
        <Container maxWidth="sm" className={classes.box}>
            <Box margin={1} padding={2}>
                <Typography variant="h5" align="center" className={classes.header}> Forgot Password </Typography>
            </Box>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Box margin={3}>
                    <TextField
                        value={formik.values.username}
                        id="username"
                        name="username"
                        label="Enter Email Id"
                        error={formik.touched.username && formik.errors.username ? true : false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        type="email"
                        variant="outlined"
                    />
                    {formik.touched.username && formik.errors.username ? <ErrorMessage message={formik.errors.username} /> : null}
                </Box>
                <Box marginLeft={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Send Password Reset Link
                </Button>
                </Box>
            </form>
            <SuccessSnack message={message} open={success} setOpen={setSuccess} />
            <FailureSnack message={message} open={failure} setOpen={setFailure} />
        </Container>
    );
}

export default ForgotPassword;