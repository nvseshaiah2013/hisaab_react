import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Heading from './HeadingComponent';
import ErrorMessage from './ErrorMessageComponent';
import { useDispatch } from 'react-redux';
import { changePassword } from '../redux/ActionCreators';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '', cfmPassword: '' },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Old Password is Required'),
            newPassword: Yup.string().required('New Password is Required')
                .matches(/[a-z]/, 'Password must contain a Small Letter')
                .matches(/[A-Z]/, 'Password must contain a Capital Letter')
                .matches(/\d/, 'Password must contain a Digit')
                .matches(/[^A-Za-z0-9]/, 'Password must contain atleast a Special Character')
                .min(8, 'Password must contain atleast 8 characters'),
            cfmPassword: Yup.string()
                .required('Confirm Password is Required')
                .oneOf([Yup.ref('newPassword')], 'Passwords do not match')

        }),
        onSubmit: values => dispatch(changePassword(values.oldPassword, values.newPassword))
    });
    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
            <Heading heading={'Change Password'} />
            <form onSubmit={formik.handleSubmit} noValidate={true}>
                <Box style={{ flexGrow: 1 }}>
                    <TextField
                        value={formik.values.oldPassword}
                        label={'Enter Old Password'}
                        error={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        id="oldPassword"
                        name="oldPassword"
                        variant="outlined"
                        type="password"
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword ? <ErrorMessage message={formik.errors.oldPassword} /> : null}
                </Box>
                <Box style={{ flexGrow: 1 }}>
                    <TextField
                        value={formik.values.newPassword}
                        label={'Enter New Password'}
                        error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        id="newPassword"
                        name="newPassword"
                        variant="outlined"
                        type="password"
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? <ErrorMessage message={formik.errors.newPassword} /> : null}
                </Box>
                <Box style={{ flexGrow: 1 }}>
                    <TextField
                        value={formik.values.cfmPassword}
                        label={'Enter Confirm Password'}
                        error={formik.touched.cfmPassword && formik.errors.cfmPassword ? true : false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        id="cfmPassword"
                        name="cfmPassword"
                        variant="outlined"
                        type="text"
                    />
                    {formik.touched.cfmPassword && formik.errors.cfmPassword ? <ErrorMessage message={formik.errors.cfmPassword} /> : null}
                </Box>
                <Box marginY={2} style={{ flexGrow: 0.8, textAlign: 'center' }}>
                    <Button variant="contained" color="primary" type="submit"> Change Password </Button>
                </Box>
            </form>
        </Container>
    );
}

export default ChangePassword;