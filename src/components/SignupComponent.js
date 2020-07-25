import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/ActionCreators';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: '3px solid blue',
        paddingBottom: '0.2rem'
    },
    box: {
        border: '2px solid gray',
        margin: '15vh auto',
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
    hover : {
        '&:hover' : {
            textDecoration : 'none'
        }
    },
    info : {
        color : theme.palette.info.main,
        '&:hover' : {
            color : theme.palette.info.dark
        }
    }
}));

const SignUp = (props) => {
    const classes = useStyles();
    const [ pwd, togglePwd ] = useState(false);
    const dispatch = useDispatch();
    console.log(props);
    const formik = useFormik(
        {
            initialValues: { name: '', username: '', password: '', cfmpassword: '' },
            validationSchema: Yup.object({
                name: Yup.string().required('Name is Required').matches('^[a-zA-Z ]+$', 'Invalid Name'),
                username: Yup.string().required('Email is Required').email('Invalid Email'),
                password: Yup.string()
                    .required('Password is Required')
                    .matches(/[a-z]/, 'Password must contain a Small Letter')
                    .matches(/[A-Z]/, 'Password must contain a Capital Letter')
                    .matches(/\d/, 'Password must contain a Digit')
                    .matches(/[^A-Za-z0-9]/, 'Password must contain atleast a Special Character')
                    .min(8, 'Password must contain atleast 8 characters'),
                cfmpassword: Yup.string()
                    .required('Confirm Password is Required')
                    .oneOf([Yup.ref('password')], 'Passwords do not match')
            }),
            onSubmit: (values,actions) => {  
                actions.setSubmitting(false);
                dispatch(signup(values.name,values.username,values.password));          
            } 
        }
    );
    return (
        <Container maxWidth="sm">
            <Box className={classes.box} boxShadow={3}>
                <Typography variant="h4" className={classes.header} align="center"> Sign Up </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Enter Name"
                        variant="outlined"
                        name="name"
                        id="name"
                        type="text"
                        autoComplete="name"
                        fullWidth={true}
                        className={classes.textField}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name ? true : false }
                    />
                    {formik.touched.name && formik.errors.name ? <Typography variant="subtitle2" color="error">{formik.errors.name}</Typography> : null}
                    <TextField
                        label="Enter Email"
                        variant="outlined"
                        name="username"
                        id="username"
                        type="email"
                        autoComplete="username"
                        fullWidth={true}
                        className={classes.textField}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username ? true : false}
                    />
                    {formik.touched.username && formik.errors.username ? <Typography variant="subtitle2" color="error">{formik.errors.username}</Typography> : null}
                    
                    <TextField
                        label="Enter Password"
                        variant="outlined"
                        name="password"
                        id="password"
                        type={pwd ? 'text' : 'password'}
                        autoComplete="current-password"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.password ? true : false }
                        className={classes.outlineField}
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
                    {formik.touched.password && formik.errors.password ? <Typography variant="subtitle2" color="error">{formik.errors.password}</Typography> : null}
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name="cfmpassword"
                        id="cfmpassword"
                        type="password"
                        fullWidth={true}
                        className={classes.textField}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cfmpassword}
                        error={formik.touched.cfmpassword && formik.errors.cfmpassword ? true : false}
                    />
                    {formik.touched.cfmpassword && formik.errors.cfmpassword ? <Typography variant="subtitle2" color="error">{formik.errors.cfmpassword}</Typography> : null}
                    <Box className={classes.flex}>
                        <Link to='/login' className={clsx(classes.info,classes.hover)}>
                            <Typography variant="body2">Have an Account? Log In.</Typography>
                        </Link>
                        <Button variant="contained" color="primary" type="submit" className={classes.pushRight} disabled={formik.isSubmitting}> Sign Up </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );

}

export default SignUp;