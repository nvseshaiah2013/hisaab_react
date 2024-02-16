import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/ActionCreators';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import FailureSnack from './FailureSnackComponent';
import ErrorMessage from './ErrorMessageComponent';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: '3px solid blue',
    },
    box: {
        border: '2px solid gray',
        margin: '15vh auto',
        padding: '1rem 2rem',
        borderRadius: '5px'
    },
    outlineField: {
        margin: '1rem auto',
        '& input:valid + div + fieldset': {
            borderColor: theme.palette.info.main,
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
    info: {
        color: theme.palette.info.main,
        '&:hover': {
            color: theme.palette.info.dark
        }
    },
    red: {
        color: theme.palette.error.main,
        '&:hover': {
            color: theme.palette.error.dark
        }
    },
    hover: {
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

const Login = () => {
    const classes = useStyles();
    const [pwd, togglePwd] = React.useState(false);
    const auth = useSelector(state => state.auth);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (auth.errMess) {
            setOpen(true);
            setMessage(auth.errMess);
        }
    }, [auth.errMess]);
    React.useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/dashboard');
        }
    }, [auth.isAuthenticated, history]);
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Email Address is Required')
                .email('Email Address is Invalid'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            dispatch(login(values.username, values.password));
            resetForm();
            setSubmitting(false);
        },
        onReset: values => {
            values.username = '';
            values.password = '';
        }
    });
    return (
        <Container maxWidth="sm">
            <Box className={classes.box} boxShadow={3}>
                <Typography variant="h4" className={classes.header} align="center"> Login </Typography>
                <form noValidate={true} onSubmit={formik.handleSubmit} >
                    <Box marginTop={3} marginBottom={1} marginLeft={{xs :0, sm:3}} marginRight={{ xs:0, sm:3}}>
                        <TextField
                            variant="outlined"
                            id="username"
                            name="username"
                            label="Enter Email"
                            type="email"
                            autoComplete="username"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            error={formik.touched.username && formik.errors.username ? true : false}
                        />
                        {formik.touched.username && formik.errors.username ?
                            <ErrorMessage message={formik.errors.username} />
                            : null}
                    </Box>
                    <Box className={classes.flex}>
                        <Link to='/forgot-password' className={clsx(classes.pushRight, classes.hover, classes.red)}>
                            <Typography variant="body2">
                                Forgot Password?
                            </Typography>
                        </Link>
                    </Box>
                    <Box marginBottom={3} marginTop={1} marginLeft={{ xs:0,sm :3}} marginRight={{ xs:0, sm:3}}>
                        <TextField
                            variant="outlined"
                            id="password"
                            name="password"
                            label="Enter Password"
                            type={pwd ? 'text' : 'password'}
                            autoComplete="current-password"
                            fullWidth
                            className={classes.outlineField}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password ? true : false}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" color="error">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => togglePwd(!pwd)}
                                        edge="end"
                                        size="large">
                                        {pwd ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <ErrorMessage message={formik.errors.password} /> : null
                        }
                    </Box>
                    <Box className={classes.flex}>
                        <Link to='/signup' className={classes.hover}>
                            <Typography variant="body2" className={classes.info}>Don't Have Account? Sign Up.</Typography>
                        </Link>
                        <Button variant="contained" color="primary" type="submit" className={classes.pushRight} disabled={formik.isSubmitting} endIcon={<LockOpenRoundedIcon />}> Login </Button>
                    </Box>
                </form>
            </Box>
            <FailureSnack message={message} open={open} setOpen={setOpen} />
        </Container>
    );
}

export default Login;