import React, { useLayoutEffect, useRef, useState, lazy } from 'react';
import { Box, Button, Container, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import axios from 'axios';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { clearFriend } from '../redux/ActionCreators';
import { baseurl } from '../resources/baseurl';
import Typeahead from './TypeAheadComponent';
import ErrorMessage from './ErrorMessageComponent';
const GiveItemForm = lazy(() => import('./GiveItemComponent'));
const GiveMoneyForm = lazy(() => import('./GiveMoneyComponent'));

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        justifyContent: 'center'
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
    padding: {
        padding: theme.spacing(1)
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
        <Container maxWidth="sm" className={classes.content}>
            <Typography align="center" variant="h4">Welcome {localStorage.getItem('username').split('@')[0]}</Typography>
            <div className={classes.toolbar} />

            <form noValidate onSubmit={formik.handleSubmit}>
                <Box>

                    <TextField
                        label="Search Friend's Username"
                        name="username"
                        id="username"
                        variant="outlined"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username ? true : false}
                        onKeyUp={debouncedFetchUsers}
                        ref={ref}
                    />
                    {formik.touched.username && formik.errors.username ? <ErrorMessage message={formik.errors.username} /> : ''}
                </Box>
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
                <FormControlLabel value="Money" control={<Radio color="primary"/>} label="Money" className={classes.flexCell} />
                <div className={classes.flexCell} />
                <FormControlLabel value="Item" control={<Radio color="primary"/>} label="Item" className={classes.flexCell} />
            </RadioGroup>

            <Typography variant="h6" align="center" className={classes.space2}> Give {type} to Friend </Typography>
            {type === 'Money' ? <GiveMoneyForm /> : <GiveItemForm />}
        </Container>
    );
};

export default GiveForm;