import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';

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
    textField: {
        margin: '1rem auto',
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important',
        },
    },
    outlineField : {
        margin: '1rem auto',
        '& input:valid + div + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + div + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + div + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important',
        },
    },
    flex: {
        display: 'flex'
    },
    pushRight: {
        marginLeft: 'auto'
    },
}));

const Login = () => {
    const classes = useStyles();
    const [ pwd, togglePwd ] = useState(false);
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Email Address is Required')
                .email('Email Address is Invalid'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        },
        onReset: values => {
            alert('Resetting');
        }
    });
    return (
        <Container maxWidth="sm">
            <Box className={classes.box} boxShadow={3}>

                <Typography variant="h4" className={classes.header} align="center"> Login </Typography>
                <form noValidate={true} onSubmit={formik.handleSubmit} >
                    <TextField
                        variant="outlined"
                        id="username"
                        name="username"
                        label="Enter Email"
                        type="email"
                        autoComplete="username"
                        fullWidth
                        className={classes.textField}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username ? true : false }
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <Typography color="error" variant="subtitle2">{formik.errors.username}</Typography>
                    ) : null}
                    <Box className={classes.flex}>
                        <Typography variant="body2" className={classes.pushRight} color="error">Forgot Password?</Typography>
                    </Box>
                    <TextField
                        variant="outlined"
                        id="password"
                        name="password"
                        label="Enter Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        className={classes.outlineField}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error = {formik.touched.password && formik.errors.password ? true : false }
                        InputProps={{
                            endAdornment : <InputAdornment position="end" color="error">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => togglePwd(!pwd)}
                                    edge="end"
                                >
                                    {pwd ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <Typography variant="subtitle2" color="error">{formik.errors.password}</Typography> : null
                    }
                    <Box className={classes.flex}>
                        <Typography variant="body1">Don't Have Account? Sign Up.</Typography>
                        <Button variant="contained" color="primary" type="submit" className={classes.pushRight} disabled={formik.isSubmitting}> Login </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Login;