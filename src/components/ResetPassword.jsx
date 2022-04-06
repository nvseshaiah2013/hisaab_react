import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from './ErrorMessageComponent';
import { useLocation, useHistory } from 'react-router-dom';

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


const ResetPassword = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const history = useHistory();
    useEffect(() => {
        if (searchParams.get('reset-token') === null) {
            history.push('/');
        }
    }, [searchParams, history]);
    const formik = useFormik({
        initialValues: { secretToken: searchParams.get('reset-token'), password: '', confirm_password: '' },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is Required')
                .matches(/[a-z]/, 'Password must contain a Small Letter')
                .matches(/[A-Z]/, 'Password must contain a Capital Letter')
                .matches(/\d/, 'Password must contain a Digit')
                .matches(/[^A-Za-z0-9]/, 'Password must contain atleast a Special Character')
                .min(8, 'Password must contain atleast 8 characters'),
            confirm_password: Yup.string()
                .required('Confirm Password is Required')
                .oneOf([Yup.ref('password')], 'Passwords do not match')
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            resetForm();
            setSubmitting(false);
        }
    });
    return (
        <Container maxWidth="sm">
            <Box className={classes.box} boxShadow={3}>
                <Typography variant="h4" className={classes.header} align="center"> Reset Password </Typography>
                <form noValidate={true} onSubmit={formik.handleSubmit}>
                    <Box marginTop={3} marginBottom={1} marginLeft={{ xs: 0, sm: 3 }} marginRight={{ xs: 0, sm: 3 }}>
                        <TextField
                            variant="outlined"
                            id="password"
                            name="password"
                            label="Enter Password"
                            type="password"
                            autoComplete="password"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password ? true : false}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <ErrorMessage message={formik.errors.password} />
                            : null}
                    </Box>
                    <Box marginTop={3} marginBottom={1} marginLeft={{ xs: 0, sm: 3 }} marginRight={{ xs: 0, sm: 3 }}>
                        <TextField
                            variant="outlined"
                            id="confirm_password"
                            name="confirm_password"
                            label="Enter Confirm Password"
                            type="password"
                            autoComplete="password"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirm_password}
                            error={formik.touched.confirm_password && formik.errors.confirm_password ? true : false}
                        />
                        {formik.touched.confirm_password && formik.errors.confirm_password ?
                            <ErrorMessage message={formik.errors.confirm_password} />
                            : null}
                    </Box>
                    <Box className={classes.flex}>
                            <Button variant="contained" color="primary" type="submit"
                            className={classes.pushRight} disabled={formik.isSubmitting}
                            > Submit </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default ResetPassword;