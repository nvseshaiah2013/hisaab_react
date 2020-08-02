import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import moment from 'moment';
import { givemoney, updateBorrowMoney } from '../redux/ActionCreators';
import { Container, TextField, Button, Box } from '@material-ui/core';
import FailureSnack from './FailureSnackComponent';
import SuccessSnack from './SuccessSnackComponent';
import ErrorMessage from './ErrorMessageComponent';

const useStyles = makeStyles((theme) => ({
    space2: {
        margin: '1rem 0'
    },
    inline: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexCell: {
        justifyContent: 'space-around',
        flexGrow: 1
    }
}));

const GiveMoneyForm = ({ borrowId, amount, place, occasion, expected_return_date, setOpen }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const dispatch = useDispatch();
    const gives = useSelector(state => state.gives);
    const selectedFriend = gives.selectedFriend;
    useEffect(() => {
        if (gives.status === true) {
            setMessage(gives.message);
            setSuccess(true);
        }
        else if (gives.status === false) {
            setMessage(gives.message);
            setFailure(true);
        }
        return () => {
            
        }
    }, [gives]);
    const formik = useFormik({
        initialValues: {
            amount: amount || 1,
            place: place || '',
            occasion: occasion || '',
            expected_return_date: moment(expected_return_date).format('YYYY-MM-DD') || moment().add(1, 'day').format('YYYY-MM-DD')
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('Amount is Required!').min(1, 'Amount should be greater than 0 !'),
            place: Yup.string().required('Place is Required!'),
            occasion: Yup.string().required('Occasion is Required!'),
            expected_return_date: Yup.date()
                .required('Expected Return Date is Required!')
                .min(moment().add(1, 'day').format('YYYY-MM-DD'), 'Expected Date should be in future!')
        }),
        onSubmit: values => {
            if (typeof setOpen === 'undefined') {
                if (selectedFriend !== null)
                    dispatch(givemoney(values, selectedFriend));
                else {
                    setFailure(true);
                    setMessage('Please select a friend before submitting!')
                }
            } else {
                dispatch(updateBorrowMoney(borrowId, values));
                setTimeout(() => setOpen(false), 1500);
            }
        }
    });
    return (
        <Container>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Box>

                    <TextField
                        label="Enter Amount"
                        name="amount"
                        id="amount"
                        variant="outlined"
                        fullWidth
                        type="number"
                        className={clsx(classes.space2, classes.textField)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        error={formik.touched.amount && formik.errors.amount ? true : false}
                    />
                    {formik.touched.amount && formik.errors.amount ? <ErrorMessage message={formik.errors.amount} /> : null}
                </Box>

                <Box>

                    <TextField
                        label="Enter Place of Transaction"
                        name="place"
                        id="place"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={clsx(classes.space2, classes.textField)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.place}
                        error={formik.touched.place && formik.errors.place ? true : false}
                    />
                    {formik.touched.place && formik.errors.place ? <ErrorMessage message={formik.errors.place} /> : null}

                </Box>
                <Box>
                    <TextField
                        label="Enter Occasion"
                        name="occasion"
                        id="occasion"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={clsx(classes.space2, classes.textField)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.occasion}
                        error={formik.touched.occasion && formik.errors.occasion ? true : false}
                    />
                    {formik.touched.occasion && formik.errors.occasion ? <ErrorMessage message={formik.errors.occasion} /> : null}
                </Box>
                <Box>
                    <TextField
                        label="Enter Expected Return Date"
                        name="expected_return_date"
                        id="expected_return_date"
                        variant="outlined"
                        fullWidth
                        type="date"
                        className={clsx(classes.space2, classes.textField)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.expected_return_date}
                        error={formik.touched.expected_return_date && formik.errors.expected_return_date ? true : false}
                    />
                    {formik.touched.expected_return_date && formik.errors.expected_return_date ? <ErrorMessage message={formik.errors.expected_return_date} /> : null}
                </Box>
                <Box className={classes.inline}>
                    <Button variant="outlined" className={classes.flexCell} type="submit" style={{ color: 'white', backgroundColor: '#2196f3' }}> Give Money </Button>
                    <div className={classes.flexCell} />
                    <Button variant="outlined" type="reset" className={classes.flexCell} style={{ color: 'white', backgroundColor: '#f44336' }}> Reset </Button>
                </Box>
            </form>
            <FailureSnack open={failure} setOpen={setFailure} message={message} />
            <SuccessSnack open={success} setOpen={setSuccess} message={message} />
        </Container>
    );
};

export default GiveMoneyForm;