import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { giveitem, updateBorrowItem } from '../redux/ActionCreators';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

const GiveItemForm = ({ setOpen, borrowId, itemName, description, occasion, expected_return_date, place }) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const dispatch = useDispatch();
    const gives = useSelector(state => state.gives);
    const selectedFriend = gives.selectedFriend;
    React.useEffect(() => {
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
            itemName: itemName || '',
            description: description || '',
            place: place || '',
            occasion: occasion || '',
            expected_return_date: expected_return_date ? moment(expected_return_date).format('YYYY-MM-DD') : 
            moment().add(1, 'day').format('YYYY-MM-DD')
        },
        validationSchema: Yup.object({
            itemName: Yup.string().required('Item Name is Required!'),
            description: Yup.string().required('Description is Required!'),
            place: Yup.string().required('Place is Required'),
            occasion: Yup.string().required('Occasion is Required'),
            expected_return_date: Yup.date()
                .required('Expected Return Date is Required!')
                .min(moment().add(1, 'day').format('YYYY-MM-DD'), 'Expected Date should be in future!')
        }),
        onSubmit: values => {
            if (typeof setOpen === 'undefined') {
                if (selectedFriend !== null)
                    dispatch(giveitem(values, selectedFriend));
                else {
                    setFailure(true);
                    setMessage('Please select a friend before submitting!');
                }
            }
            else {
                dispatch(updateBorrowItem(borrowId, values))
                setTimeout(() => setOpen(false),1500);
            }
        }
    });
    return (
        <Container>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        label="Enter Item Name"
                        name="itemName"
                        id="itemName"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.space2}
                        value={formik.values.itemName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.itemName && formik.errors.itemName ? true : false}
                    />
                    {formik.touched.itemName && formik.errors.itemName ? <ErrorMessage message={formik.errors.itemName} /> : null}
                </Box>
                <Box>

                    <TextField
                        label="Enter Description"
                        name="description"
                        id="description"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.space2}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && formik.errors.description ? true : false}
                    />
                    {formik.touched.description && formik.errors.description ? <ErrorMessage message={formik.errors.description} /> : null}
                </Box>
                <Box>

                    <TextField
                        label="Enter Place of Transaction"
                        name="place"
                        id="place"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.space2}
                        value={formik.values.place}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                        className={classes.space2}
                        value={formik.values.occasion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
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
                        className={classes.space2}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.expected_return_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.expected_return_date && formik.errors.expected_return_date ? true : false}
                    />
                    {formik.touched.expected_return_date && formik.errors.expected_return_date ? <ErrorMessage message={formik.errors.expected_return_date} /> : null}
                </Box>
                <Box className={classes.inline}>
                    <Button variant="outlined" className={classes.flexCell} type="submit" style={{ color: 'white', backgroundColor: '#2196f3' }}> Give Item </Button>
                    <div className={classes.flexCell} />
                    <Button variant="outlined" type="reset" className={classes.flexCell} style={{ color: 'white', backgroundColor: '#f44336' }}> Reset </Button>
                </Box>
            </form>
            <FailureSnack message={message} open={failure} setOpen={setFailure} />
            <SuccessSnack message={message} open={success} setOpen={setSuccess} />
        </Container>
    );
};

export default GiveItemForm;