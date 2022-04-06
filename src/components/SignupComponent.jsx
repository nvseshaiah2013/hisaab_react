import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/ActionCreators';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import SuccessSnack from './SuccessSnackComponent';
import FailureSnack from './FailureSnackComponent';
import ErrorMessage from './ErrorMessageComponent';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: '3px solid blue',
        paddingBottom: '0.2rem'
    },
    box: {
        border: '2px solid gray',
        margin: '10vh auto',
        padding: '1rem 2rem',
        borderRadius: '5px'
    },
    outlineField: {
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
    hover: {
        '&:hover': {
            textDecoration: 'none'
        }
    },
    info: {
        color: theme.palette.info.main,
        '&:hover': {
            color: theme.palette.info.dark
        }
    }
}));

const SignUp = (props) => {
    const classes = useStyles();
    const [pwd, togglePwd] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const state = useSelector(state => state.signup);
    const dispatch = useDispatch();

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
            onSubmit: (values, { setSubmitting, resetForm }) => {
                setSubmitting(false);
                resetForm();
                dispatch(signup(values.name, values.username, values.password));
            }
        }
    );
    return (
        <Container maxWidth="sm">
            <Box className={classes.box} boxShadow={3}>
                <Typography variant="h4" className={classes.header} align="center"> Sign Up </Typography>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <Box marginRight={{xs :0, sm:3}} marginLeft={{xs :0, sm:3}}>
                        <TextField
                            label="Enter Name"
                            variant="outlined"
                            name="name"
                            id="name"
                            type="text"
                            autoComplete="name"
                            fullWidth={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && formik.errors.name ? true : false}
                        />
                        {formik.touched.name && formik.errors.name ? <ErrorMessage message={formik.errors.name} /> : null}
                    </Box>
                    <Box marginLeft={{xs :0, sm:3}} marginRight={{xs :0, sm:3}}>
                        <TextField
                            label="Enter Email"
                            variant="outlined"
                            name="username"
                            id="username"
                            type="email"
                            autoComplete="username"
                            fullWidth={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            error={formik.touched.username && formik.errors.username ? true : false}
                        />
                        {formik.touched.username && formik.errors.username ? <ErrorMessage message={formik.errors.username} /> : null}
                    </Box>
                    <Box marginRight={{xs :0, sm:3}} marginLeft={{xs :0, sm:3}}>
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
                            error={formik.touched.password && formik.errors.password ? true : false}
                            className={classes.outlineField}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" color="error">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => togglePwd(!pwd)}
                                        edge="end"
                                    >
                                        {pwd ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}

                        />
                        {formik.touched.password && formik.errors.password ? <ErrorMessage message={formik.errors.password} /> : null}
                    </Box>
                    <Box marginRight={{xs :0, sm:3}} marginLeft={{xs :0, sm:3}}>
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            name="cfmpassword"
                            id="cfmpassword"
                            type="password"
                            fullWidth={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cfmpassword}
                            error={formik.touched.cfmpassword && formik.errors.cfmpassword ? true : false}
                        />
                        {formik.touched.cfmpassword && formik.errors.cfmpassword ? <ErrorMessage message={formik.errors.cfmpassword} /> : null}
                    </Box>
                    <Box className={classes.flex}>
                        <Link to='/login' className={clsx(classes.info, classes.hover)}>
                            <Typography variant="body2">Have an Account? Log In.</Typography>
                        </Link>
                        <Button variant="contained" color="primary" type="submit" className={classes.pushRight} disabled={formik.isSubmitting}> Sign Up </Button>
                    </Box>
                </form>
            </Box>
            <SuccessSnack message={message} open={success} setOpen={setSuccess} />
            <FailureSnack message={message} open={failure} setOpen={setFailure} />
        </Container>
    );

}

export default SignUp;