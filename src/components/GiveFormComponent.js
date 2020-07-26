import React, { useState } from 'react';
import { Container, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import Typeahead from './TypeAheadComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
            backgroundColor: 'white',
            color: theme.palette.info.main,
        }
    },
    red: {
        backgroundColor: theme.palette.error.main,
        color: 'white',
        '& :hover': {
            backgroundColor: 'white',
            color: theme.palette.error.main,
        }
    }
}));

const GiveForm = (props) => {
    const classes = useStyles();
    const [type, setType] = useState('Money');
    const formik = useFormik({
        initialValues : { name : ''},
        validationSchema : Yup.object({
            name : Yup.string().required('Username is Required to Search')
        }),
        onSubmit : values => alert(`${JSON.stringify(values)}`)
    });
    const handleChange = (event) => {
        setType(event.target.value)
    }

    return (
        <Container maxWidth="md" className={classes.content}>
            <Typography align="center" variant="h4">Welcome {localStorage.getItem('username').split('@')[0]}</Typography>
            <div className={classes.toolbar} />
            
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    label="Search Friend's Username"
                    name="name"
                    id="name"
                    variant="outlined"
                    fullWidth={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={true}
                />
                <Typeahead />
                <Box textAlign="center" className={classes.space2}>
                    <Button endIcon={<SearchSharpIcon />} type="submit" variant="contained" color="primary"> Search </Button>
                </Box>
            </form>
            <div className={classes.toolbar} />
            <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange} className={classes.inline}>
                <FormControlLabel value="Money" control={<Radio />} label="Money" className={classes.flexCell} />
                <div className={classes.flexCell} />
                <FormControlLabel value="Item" control={<Radio />} label="Item" className={classes.flexCell}/>
            </RadioGroup>

            <Typography variant="h6" align="center" className={classes.space2}> Give {type} to Friend </Typography>
            {type === 'Money' ? <GiveMoneyForm /> : <GiveItemForm />}
        </Container>
    );
};

const GiveMoneyForm = () => {
    const classes = useStyles();
    return (
        <Container>
            <form noValidate>
                <TextField
                    label="Enter Amount"
                    name="amount"
                    id="amount"
                    variant="outlined"
                    fullWidth
                    type="number"
                    className={classes.space2}
                />
               
                <TextField
                    label="Enter Place of Transaction"
                    name="place"
                    id="place"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
                <TextField
                    label="Enter Occasion"
                    name="occasion"
                    id="occasion"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
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
                />
                <Box className={classes.inline}>
                    <Button variant="outlined" className={clsx(classes.info,classes.flexCell)} type="submit"> Give Money </Button>
                    <div className={classes.flexCell} />
                    <Button variant="contained"type="reset" className={clsx(classes.red,classes.flexCell)}> Reset </Button>
                </Box>
            </form>
        </Container>
    );
};

const GiveItemForm = () => {
    const classes = useStyles();
    return (
        <Container>
            <form noValidate>
                <TextField
                    label="Enter Item Name"
                    name="itemName"
                    id="itemName"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
                <TextField
                    label="Enter Description"
                    name="description"
                    id="description"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
                <TextField
                    label="Enter Place of Transaction"
                    name="place"
                    id="place"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
                <TextField
                    label="Enter Occasion"
                    name="occasion"
                    id="occasion"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.space2}
                />
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
                />
                <Box className={classes.inline}>
                    <Button variant="outlined" className={clsx(classes.info,classes.flexCell)} type="submit"> Give Item </Button>
                    <div className={classes.flexCell} />
                    <Button variant="contained"type="reset" className={clsx(classes.red,classes.flexCell)}> Reset </Button>
                </Box>
            </form>
        </Container>
    );
};

export default GiveForm;