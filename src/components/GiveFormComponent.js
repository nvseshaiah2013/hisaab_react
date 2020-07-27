import React, { useLayoutEffect, useRef, useState } from 'react';
import { Box, Button, Container, FormControlLabel, Radio, RadioGroup, Snackbar, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { clearFriend, giveitem, givemoney } from '../redux/ActionCreators';
import { baseurl } from '../resources/baseurl';
import Typeahead from './TypeAheadComponent';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    inline: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexCell: {
        justifyContent: 'space-around',
        flexGrow: 1
    },
    space2: {
        margin: '1rem 0'
    },
    info: {
        backgroundColor: theme.palette.info.main,
        color: 'white',
        '& :hover': {
            backgroundColor: theme.palette.info.dark,
        }
    },
    red: {
        backgroundColor: theme.palette.error.main,
        color: 'white',
        '& :hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
    padding: {
        padding: theme.spacing(1)
    },
    textField: {
        margin: '1rem auto',
        '& input:valid + fieldset': {
            borderColor: theme.palette.info.main,
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: theme.palette.error.dark,
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important',
        },
    }
}));

const GiveForm = (props) => {
    const classes = useStyles();
    const [type, setType] = useState('Money');
    const [users, setUsers] = useState([]);
    const [width, setWidth] = useState(0);
    const [searched, setSearched] = useState(false);
    const [open, setOpen] = useState(true);
    const ref = useRef();
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }, []);
    const formik = useFormik({
        initialValues: { username: '' },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is Required to Search')
        }),
        onSubmit: values => { fetchUsers(); setSearched(true); setOpen(true); dispatch(clearFriend()); }
    });
    const handleChange = (event) => {
        setType(event.target.value)
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchUsers = () => {
        if (formik.values.username === '')
            return;
        axios.get(baseurl + `users`, { params: { username: formik.values.username } })
            .then((data) => { setUsers(data.data.users) })
            .catch(err => console.log(err));
    }
    const debouncedFetchUsers = debounce(fetchUsers, 3000);

    return (
        <Container maxWidth="md" className={classes.content}>
            <Typography align="center" variant="h4">Welcome {localStorage.getItem('username').split('@')[0]}</Typography>
            <div className={classes.toolbar} />

            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label="Search Friend's Username"
                    name="username"
                    id="username"
                    variant="outlined"
                    fullWidth={true}
                    className={classes.textField}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={formik.touched.username && formik.errors.username ? true : false}
                    onKeyUp={debouncedFetchUsers}
                    ref={ref}
                />
                {<Typography color="error" variant="body2" className={classes.padding}>{formik.errors.username}</Typography>}
                <Typeahead
                    users={users}
                    username={formik.values.username}
                    width={width} searched={searched}
                    setUsers={setUsers}
                    open={open}
                    setOpen={setOpen}
                />
                <Box textAlign="center" className={classes.space2}>
                    <Button endIcon={<SearchSharpIcon />} type="submit" variant="contained" color="primary"> Search </Button>
                </Box>
            </form>
            <div className={classes.toolbar} />
            <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange} className={classes.inline}>
                <FormControlLabel value="Money" control={<Radio />} label="Money" className={classes.flexCell} />
                <div className={classes.flexCell} />
                <FormControlLabel value="Item" control={<Radio />} label="Item" className={classes.flexCell} />
            </RadioGroup>

            <Typography variant="h6" align="center" className={classes.space2}> Give {type} to Friend </Typography>
            {type === 'Money' ? <GiveMoneyForm dispatch={dispatch}/> : <GiveItemForm dispatch={dispatch}/>}
            <SnackBar />
        </Container>
    );
};

const GiveMoneyForm = ( {dispatch}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const selectedFriend = useSelector(state => state.gives.selectedFriend);  
    const formik = useFormik({
        initialValues: {
            amount: 1,
            place: '',
            occasion: '',
            expected_return_date: moment().add(1, 'day').format('YYYY-MM-DD')
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('Amount is Required!').min(1, 'Amount should be greater than 0 !'),
            place: Yup.string().required('Place is Required!'),
            occasion: Yup.string().required('Occasion is Required!'),
            expected_return_date: Yup.date()
                .required('Expected Return Date is Required!')
                .min(moment().add(1, 'day').format('YYYY-MM-DD'), 'Expected Date should be in future!')
        }),
        onSubmit: values => { if(selectedFriend!==null)
            dispatch(givemoney(values,selectedFriend));
        else {
            setOpen(true);
            setMessage('Please Select A Friend')
        } }
    });
    return (
        <Container>
            <form noValidate onSubmit={formik.handleSubmit}>
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
                {formik.touched.amount && formik.errors.amount ? <div>{formik.errors.amount}</div> : ''}

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
                {formik.touched.place && formik.errors.place ? <div>{formik.errors.place}</div> : ''}

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
                {formik.touched.occasion && formik.errors.occasion ? <div>{formik.errors.occasion}</div> : ''}
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
                {formik.touched.expected_return_date && formik.errors.expected_return_date ? <div>{formik.errors.expected_return_date} </div> : ''}
                <Box className={classes.inline}>
                    <Button variant="outlined" className={clsx(classes.info, classes.flexCell)} type="submit"> Give Money </Button>
                    <div className={classes.flexCell} />
                    <Button variant="outlined" type="reset" className={clsx(classes.red, classes.flexCell)}> Reset </Button>
                </Box>
            </form>
            <SnackBar open={open} message={message} setOpen={setOpen}/>
        </Container>
    );
};

const GiveItemForm = ({dispatch}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const selectedFriend = useSelector(state => state.gives.selectedFriend);
    const formik = useFormik({
        initialValues: {
            itemName: '',
            description: '',
            place: '',
            occasion: '',
            expected_return_date: moment().add(1, 'day').format('YYYY-MM-DD')
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
            if(selectedFriend!==null)
                dispatch(giveitem(values,selectedFriend));
            else {
                setOpen(true);
                setMessage('Please Select A Friend')
            }  
        }
    });
    return (
        <Container>
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label="Enter Item Name"
                    name="itemName"
                    id="itemName"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={clsx(classes.space2, classes.textField)}
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.itemName && formik.errors.itemName ? true : false}
                />
                {formik.touched.itemName && formik.errors.itemName ? <div>{formik.errors.itemName}</div> : ''}

                <TextField
                    label="Enter Description"
                    name="description"
                    id="description"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={clsx(classes.space2, classes.textField)}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && formik.errors.description ? true : false}
                />
                {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : ''}

                <TextField
                    label="Enter Place of Transaction"
                    name="place"
                    id="place"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={clsx(classes.space2, classes.textField)}
                    value={formik.values.place}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.place && formik.errors.place ? true : false}
                />
                {formik.touched.place && formik.errors.place ? <div>{formik.errors.place}</div> : ''}

                <TextField
                    label="Enter Occasion"
                    name="occasion"
                    id="occasion"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={clsx(classes.space2, classes.textField)}
                    value={formik.values.occasion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.occasion && formik.errors.occasion ? true : false}
                />
                {formik.touched.occasion && formik.errors.occasion ? <div>{formik.errors.occasion}</div> : ''}
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
                    value={formik.values.expected_return_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.expected_return_date && formik.errors.expected_return_date ? true : false}
                />
                {formik.touched.expected_return_date && formik.errors.expected_return_date ? <div>{formik.errors.expected_return_date} </div> : ''}
                <Box className={classes.inline}>
                    <Button variant="outlined" className={clsx(classes.info, classes.flexCell)} type="submit"> Give Item </Button>
                    <div className={classes.flexCell} />
                    <Button variant="outlined" type="reset" className={clsx(classes.red, classes.flexCell)}> Reset </Button>
                </Box>
            </form>
            <SnackBar open={open} message={message} setOpen={setOpen}/>
        </Container>
    );
};

const SnackBar = ({ message, open, setOpen }) => {
    if(open){
        setTimeout(()=> setOpen(false),3000);
    }
    return (<Snackbar message={message} open={open} autoHideDuration={6000} />);
}

export default GiveForm;