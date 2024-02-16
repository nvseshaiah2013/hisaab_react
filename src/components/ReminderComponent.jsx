import React from 'react';
import Container from '@mui/material/Container';
import {makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Legend from './LegendComponent';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReceivedReminders, fetchSentReminders, markReminderAsRead, deleteReminder } from '../redux/ActionCreators';
import moment from 'moment';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FailureSnack from './FailureSnackComponent';
import SuccessSnack from './SuccessSnackComponent';
import Heading from './HeadingComponent';

import { indigo, red, green, orange } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: '2rem'
    },
    flexCell: {
        textAlign: 'center'
    },
    reminder: {
        borderRadius: '8px',
        border: '1px solid grey',
    },
    leftAlign: {
        marginRight: 'auto',
    },
    rightAlign: {
        marginLeft: 'auto',
        display : 'flex'
    },
    span: {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    button: {
        marginRight: '0.2rem',
        flexGrow : 1
    }
}));

const Reminders = () => {
    const classes = useStyles();
    const [type, setType] = React.useState('Sent');
    const reminders = useSelector(state => state.reminders);
    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setType(event.target.value);
    }
    React.useEffect(() => {
        if (type === 'Sent') {
            dispatch(fetchSentReminders());
        }
        else if (type === 'Received') {
            dispatch(fetchReceivedReminders());
        }
        return () => { };
    }, [dispatch, type]);
    React.useEffect(() => {
        if (reminders.status === true) {
            setSuccess(true);
        }
        else if (reminders.status === false) {
            setFailure(true);
        }
    }, [reminders]);
    return (
        <Container maxWidth="md">
            <Heading heading={'My Reminders'} />
            <Legend />
            <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange} className={classes.flex}>
                <FormControlLabel value="Sent" control={<Radio color="primary" />} label="Sent Reminders" className={classes.flexCell} />
                <FormControlLabel value="Received" control={<Radio color="primary" />} label="Received Reminders" className={classes.flexCell} />
            </RadioGroup>
            {type === 'Sent' ? <ReminderList type={'Sent'} list={reminders.sentReminders} /> :
                <ReminderList type={'Received'} list={reminders.receivedReminders} />}
            <SuccessSnack message={reminders.message} open={success} setOpen={setSuccess} />
            <FailureSnack message={reminders.message} open={failure} setOpen={setFailure} />
        </Container>
    );
};

const ReminderList = ({ type, list }) => {
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(-1);
    React.useEffect(() => {
        setIndex(-1);
        return () => { };
    }, [type]);
    return (
        <Box margin={1}>
            <BorrowDialog
                actual_return_date={index >= 0 ? list[index].borrow_id.actual_return_date : ''}
                expected_return_date={index >= 0 ? list[index].borrow_id.expected_return_date : ''}
                amount={index >= 0 ? list[index].borrow_id.amount : ''}
                itemName={index >= 0 ? list[index].borrow_id.itemName : ''}
                description={index >= 0 ? list[index].borrow_id.description : ''}
                occasion={index >= 0 ? list[index].borrow_id.occasion : ''}
                place={index >= 0 ? list[index].borrow_id.place : ''}
                status={index >= 0 ? list[index].borrow_id.status : ''}
                open={open}
                setOpen={setOpen}
            />
            {
                list.map((reminder, index) => {
                    return (
                        <Reminder
                            key={index}
                            index={index}
                            header={reminder.header}
                            message={reminder.message}
                            createdAt={reminder.createdAt}
                            type={type}
                            borrower={reminder.borrower}
                            borowee={reminder.borowee}
                            read={reminder.read}
                            setOpen={setOpen}
                            setIndex={setIndex}
                            reminderId={reminder._id}
                        />
                    );
                })
            }

            {
                list.length === 0 ? <Box margin={4}>
                    <Typography variant="h4" display="block" color="error" align="center"> No Reminders Found for your query!</Typography>
                </Box> : null
            }
        </Box>
    );
}

const Reminder = ({ index, borrower, borowee, header, message, createdAt, type, setOpen, setIndex, read, reminderId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteReminder(reminderId, parseInt(index)));
    }
    return (
        <Box marginY={2} padding={3} className={classes.reminder}>
            <Typography variant="h5" style={{ color: indigo[300] }} display="block">{header}
                {!read ? <DoneIcon style={{ marginLeft: '0.3rem' }} /> : <DoneAllIcon style={{ color: indigo[500], marginLeft: '0.3rem' }} />}
            </Typography>
            <Divider />
            <Box padding={3}>
                <Typography variant="body2" style={{ color: 'grey' }} display="block">
                    {message}
                </Typography>
                <Typography variant="subtitle2" display="block"> {moment(createdAt).format('Do of MMM, YYYY')} </Typography>
            </Box>

            <Divider />
            <Box className={classes.flex}>
                <Box className={classes.leftAlign}>
                    <Typography variant="body1">{type === 'Sent' ? ' Sent To : ' : ' Received From : '}</Typography>
                    <Typography variant="body1">{type === 'Sent' ? borowee.name : borrower.name}</Typography>
                    <Typography variant="body2">{type === 'Sent' ? borowee.username : borrower.username}</Typography>
                </Box>
                <Box className={classes.rightAlign} marginTop={2}>
                    {type === 'Sent' ?
                        <Button
                            className={classes.button}
                            style={{ borderColor: red[500] }}
                            variant="outlined"
                            type="button"
                            onClick={handleDelete}>
                            Delete
                    </Button>
                        :
                        !read ? <Button
                            className={classes.button}
                            variant="outlined"
                            style={{ borderColor: green[500] }}
                            type="button"
                            onClick={() => dispatch(markReminderAsRead(reminderId))}>
                            Mark As Read
                    </Button> : null
                    }
                    <div className={classes.button}/>
                    <Button type="button" onClick={() => { setIndex(index); setOpen(true); }} variant="contained" color="primary"> View Borrow Info </Button>
                </Box>
            </Box>
        </Box>
    );
}

const BorrowDialog = ({ itemName, occasion, description,
    place, expected_return_date,
    actual_return_date,
    status, amount, open, setOpen }) => {
    const classes = useStyles();
    let color = orange;
    if (status === 0) {
        color = orange;
    }
    else if (status === 1) {
        color = green;
    }
    else if (status === 2) {
        color = red;
    }
    else if (status === 3) {
        color = indigo;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="borrow"> Borrow Information </DialogTitle>
            <DialogContent>
                {typeof amount !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Amount : {amount}
                    </Typography>
                    : null}
                {typeof itemName !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Item Name :  {itemName}
                    </Typography>
                    : null}
                {typeof description !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Description : {description}
                    </Typography>
                    : null}
                {typeof occasion !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Occasion : {occasion}
                    </Typography>
                    : null}
                {typeof place !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Place : {place}
                    </Typography>
                    : null}
                {typeof status !== 'undefined' ?
                    <Typography variant="body2" display="block">
                        Status : <span className={classes.span} style={{ backgroundColor: color[500] }} />
                    </Typography>
                    : null}


            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} type="button" variant="outlined"> Close </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Reminders;