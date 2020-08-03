import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useFormik } from 'formik';
import ErrorMessage from './ErrorMessageComponent';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: '3px solid blue',
    },
    box: {
        border: '2px solid gray',
        margin: '20vh auto',
        padding: '1rem 2rem',
        borderRadius: '5px'
    },
}))

const ForgotPassword = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: { username: ' ' },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Email Address is Required')
                .email('Username should be valid email id')
        }),
        onSubmit: values => alert('Hello World')
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
                        label="Enter Username"
                        error={formik.touched.username && formik.errors.username ? true : false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        type="email"
                        variant="outlined"
                    />
                    {formik.touched.username && formik.errors.username ? <ErrorMessage message={formik.errors.username} /> : null}
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Get OTP
                </Button>
            </form>
        </Container>
    );
}

export default ForgotPassword;