import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import {makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGivenItems, fetchGivenMoney, getToken, deleteBorrowMoney, deleteBorrowItem } from '../redux/ActionCreators';
import moment from 'moment';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Legend from './LegendComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import EditGiveItemComponent from './EditGiveItemComponent';
import EditGiveMoneyComponent from './EditGiveMoneyComponent';
import ValidateDialog from './ValidateDialogComponent';
import TokenDialog from './TokenDialogComponent';
import SuccessSnack from './SuccessSnackComponent';
import FailureSnack from './FailureSnackComponent';
import ReminderModal from './ReminderModalComponent';
import Heading from './HeadingComponent';

import { orange, green, red, indigo, lime } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    table: {
        overflowX: 'scroll',
        width: '100%'
    },
    span: {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        display: 'inline-block',
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        flexGrow: 1
    }
}));

const Gives = ({ type }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const gives = useSelector(state => state.gives);
    const token = useSelector(state => state.token);
    const reminders = useSelector(state => state.reminders);
    const [failure, setFailure] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [tokenOp, setTokenOp] = React.useState(false);
    React.useEffect(() => {
        if (type === 'Money') {
            dispatch(fetchGivenMoney());
        }
        else if (type === 'Items') {
            dispatch(fetchGivenItems());
        }
        return () => {

        }
    }, [type, dispatch]);
    React.useEffect(() => {
        if (token.secretToken) {
            setTokenOp(true);
        }
        else if (token.status === false) {
            setFailure(true);
        }
        else if (token.status === true) {
            setSuccess(true);
        }
        return () => {

        }
    }, [token]);

    React.useEffect(() => {
        if (reminders.status === true) {
            setSuccess(true);
        }
        else if (reminders.status === false) {
            setFailure(true);
        }
        return () => {

        }
    }, [reminders]);
    const moneyHeaders = ['Action', 'Amount', 'Name', 'Place', 'Expected Return Date', 'Status'];
    const itemHeaders = ['Action', 'Item', 'Name', 'Place', 'Expected Return Date', 'Status'];
    if (type === 'Money') {
        return (
            <Container maxWidth="md">
                <Heading heading={`Given ${type}`} />
                <div className={classes.toolbar} />
                <Legend />
                <TokenDialog open={tokenOp} setOpen={setTokenOp} message={token.secretToken} />
                <div className={classes.toolbar} />
                <TableContainer>
                    <Table stickyHeader={true} className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    moneyHeaders.map((cell, index) => {
                                        return (
                                            <TableCell key={index}>
                                                {cell}
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                gives.givenMoney.map((money, index) => {
                                    return (
                                        <GivenMoney
                                            key={index}
                                            amount={money.amount}
                                            borowee={money.borowee}
                                            place={money.place}
                                            occasion={money.occasion}
                                            expected_return_date={money.expected_return_date}
                                            status={money.status}
                                            actual_return_date={money.actual_return_date}
                                            _id={money.id}
                                            index={index}
                                        />
                                    );
                                })
                            }
                            {
                                gives.givenMoney.length === 0 ? <EmptyRow type={type} /> : <React.Fragment />
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box textAlign="center" margin={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<RefreshRoundedIcon />}
                        onClick={() => dispatch(fetchGivenMoney())}
                    > Refresh </Button>
                </Box>
                <SuccessSnack open={success} setOpen={setSuccess} message={reminders.message ? reminders.message : token.message} />
                <FailureSnack open={failure} setOpen={setFailure} message={reminders.message ? reminders.message : token.message} />
            </Container>
        );
    }
    else if (type === 'Items') {
        return (
            <Container maxWidth="md">
                <Heading heading={`Given ${type}`} /> <div className={classes.toolbar} />
                <Legend />
                <TokenDialog open={tokenOp} setOpen={setTokenOp} message={token.secretToken} />
                <div className={classes.toolbar} />
                <TableContainer>
                    <Table stickyHeader={true} className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    itemHeaders.map((cell, index) => {
                                        return (
                                            <TableCell key={index}>
                                                {cell}
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gives.givenItems.map((item, index) => {
                                return (
                                    <GivenItem
                                        key={index}
                                        itemName={item.itemName}
                                        description={item.description}
                                        borowee={item.borowee}
                                        place={item.place}
                                        occasion={item.occasion}
                                        expected_return_date={item.expected_return_date}
                                        status={item.status}
                                        actual_return_date={item.actual_return_date}
                                        _id={item.id}
                                        index={index}
                                    />
                                );
                            })
                            }
                            {
                                gives.givenItems.length === 0 ? <EmptyRow type={type} /> : <React.Fragment />
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box textAlign="center" margin={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<RefreshRoundedIcon />}
                        onClick={() => dispatch(fetchGivenItems())}
                    > Refresh </Button>
                </Box>
                <SuccessSnack open={success} setOpen={setSuccess} message={reminders.message ? reminders.message : token.message} />
                <FailureSnack open={failure} setOpen={setFailure} message={reminders.message ? reminders.message : token.message} />
            </Container >
        );
    }
    else
        return (
            <Container className={classes.content}>
                <Typography variant="h4" align="center" display="block" className={classes.header}> Given {type} </Typography>
                <Typography>Wrong Entity</Typography>
            </Container>
        );
}

const GivenMoney = ({ amount, borowee, place, occasion, expected_return_date, actual_return_date, status, _id, index }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [validate, setValidate] = React.useState(false);
    const [remind, setReminder] = React.useState(false);
    const dispatch = useDispatch();
    const handleViewToken = () => {
        dispatch(getToken(_id));
    }
    let color = orange;
    if (status === "PENDING") {
        color = orange;
    }
    else if (status === "APPROVED") {
        color = green;
    }
    else if (status === "REJECTED") {
        color = red;
    }
    else if (status === "RETURNED") {
        color = indigo;
    } return (
    <React.Fragment>
        <ReminderModal
            open={remind}
            setOpen={setReminder}
            borrowId={_id}
        />
        <EditGiveMoneyComponent
            open={edit}
            setOpen={setEdit}
            borrowId={_id}
            amount={amount}
            occasion={occasion}
            place={place}
            expected_return_date={expected_return_date}
        />
        <ValidateDialog open={validate} setOpen={setValidate} page={'money'} borrowId={_id} type={'borrow'} />
        <TableRow hover>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell >
                {amount}
            </TableCell>
            <TableCell>
                {borowee.name}
                <Tooltip enterTouchDelay={100} title={borowee.username}>
                    <IconButton aria-label={borowee.username} size="large">
                        <InfoRoundedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>

            <TableCell>
                {place}
                <Tooltip enterTouchDelay={100} title={occasion}>
                    <IconButton aria-label={occasion} size="large">
                        <InfoRoundedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>

            <TableCell>
                {moment(expected_return_date).format('Do, MMM, YYYY')}
                <Tooltip enterTouchDelay={100} title={actual_return_date ? `Returned On : ${moment(actual_return_date).format('Do, MMM, YYYY')}` : 'Not Returned'}>
                    <IconButton aria-label={borowee.username} size="large">
                        <InfoRoundedIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <span className={classes.span} style={{ backgroundColor: color[500] }} />
            </TableCell>

        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1} className={classes.flex}>
                        {status === "PENDING" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: green[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<CheckCircleOutlineRoundedIcon />}
                            type="button"
                            onClick={() => setValidate(true)}
                        > Validate </Button> : ''}

                        <span className={classes.button} />
                        {status === "PENDING" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: orange[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<EditIcon />}
                            type="button"
                            onClick={() => setEdit(true)}
                        > Edit </Button> : ''}

                        <span className={classes.button} />
                        {status !== "APPROVED" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: red[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<DeleteRoundedIcon />}
                            type="button"
                            onClick={() => dispatch(deleteBorrowMoney(_id,index))}
                        > Delete </Button> : ''}

                        <span className={classes.button} />
                        {status === "APPROVED" ?
                            <Button
                                variant="outlined"
                                className={classes.button}
                                style={{ backgroundColor: lime[500], color: 'white' }}
                                endIcon={<NotificationsRoundedIcon />}
                                type="button"
                                onClick={() => setReminder(true)}
                            > Remind </Button> : ''}
                        <span className={classes.button} />
                        {status === "APPROVED" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: indigo[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<CodeRoundedIcon />}
                            type="button"
                            onClick={handleViewToken}
                        > View Token </Button> : ''}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
);
}

const GivenItem = ({ itemName, description, borowee, place, occasion, expected_return_date, status, actual_return_date, _id, index }) => {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [validate, setValidate] = React.useState(false);
    const [remind, setReminder] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleViewToken = () => {
        dispatch(getToken(_id));
    }
    let color = orange;
    if (status === "PENDING") {
        color = orange;
    }
    else if (status === "APPROVED") {
        color = green;
    }
    else if (status === "REJECTED") {
        color = red;
    }
    else if (status === "RETURNED") {
        color = indigo;
    }
    return (
        <React.Fragment>
            <ReminderModal
                open={remind}
                setOpen={setReminder}
                borrowId={_id}
            />
            <EditGiveItemComponent
                open={edit}
                setOpen={setEdit}
                itemName={itemName}
                description={description}
                place={place}
                occasion={occasion}
                expected_return_date={expected_return_date}
                borrowId={_id}
            />
            <ValidateDialog open={validate} setOpen={setValidate} page={'items'} borrowId={_id} type={'borrow'} />
            <TableRow hover>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {itemName}
                    <Tooltip title={description} enterTouchDelay={100}>
                        <IconButton aria-label={description} size="large">
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    {borowee.name}
                    <Tooltip title={borowee.username} enterTouchDelay={100}>
                        <IconButton aria-label={borowee.username} size="large">
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {place}
                    <Tooltip title={`Occasion : ${occasion}`} enterTouchDelay={100}>
                        <IconButton aria-label={`Occasion : ${occasion}`} size="large">
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {moment(expected_return_date).format('Do, MMM, YYYY')}
                    <Tooltip enterTouchDelay={100} title={actual_return_date ? `Returned On : ${moment(actual_return_date).format('Do, MMM, YYYY')}` : 'Not Returned'}>
                        <IconButton aria-label={borowee.username} size="large">
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <span className={classes.span} style={{ backgroundColor: color[500] }} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} className={classes.flex}>
                            {status === "PENDING" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: green[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<CheckCircleOutlineRoundedIcon />}
                                type="button"
                                onClick={() => setValidate(true)}
                            > Validate </Button> : ''}

                            <span className={classes.button} />
                            {status === "PENDING" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: orange[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<EditIcon />}
                                type="button"
                                onClick={() => setEdit(true)}
                            > Edit </Button> : ''}

                            <span className={classes.button} />
                            {status !== "APPROVED" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: red[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<DeleteRoundedIcon />}
                                type="button"
                                onClick={() => dispatch(deleteBorrowItem(_id,index))}
                            > Delete </Button> : ''}
                            <span className={classes.button} />
                            {status === "APPROVED" ?
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    style={{ backgroundColor: lime[500], color: 'white' }}
                                    endIcon={<NotificationsRoundedIcon />}
                                    type="button"
                                    onClick={() => setReminder(true)}
                                > Remind </Button> : ''}
                            <span className={classes.button} />
                            {status === "APPROVED" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: indigo[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<CodeRoundedIcon />}
                                type="button"
                                onClick={handleViewToken}
                            > View Token </Button> : ''}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const EmptyRow = ({ type }) => {
    return (
        <TableRow>
            <TableCell colSpan={6}>
                <Typography variant="body1" align="center" display="block" style={{ color: red[500], fontWeight: 'bolder' }}> You have not given any {type} .</Typography>
                <Box margin={1} textAlign="center">
                    <Button href={`/dashboard/`} variant="outlined" size="large" color="primary">
                        Want To Start Helping ?
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default Gives;