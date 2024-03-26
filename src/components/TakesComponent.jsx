import React from 'react/';
import {makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import Heading from './HeadingComponent';
import moment from 'moment';
import { fetchTakenItems, fetchTakenMoney, getToken, rejectBorrow } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Legend from './LegendComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ValidateDialog from './ValidateDialogComponent';
import SuccessSnack from './SuccessSnackComponent';
import FailureSnack from './FailureSnackComponent';
import TokenDialog from './TokenDialogComponent';
import axios from 'axios';
import { config } from '../resources/config'

import { orange, green, red, indigo } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    margin: {
        marginBottom: '4px',
        marginRight: '4px'
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

const Takes = ({ type }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [tokenOp, setTokenOp] = React.useState(false);
    const takes = useSelector(state => state.takes);
    const token = useSelector(state => state.token);
    const [failure, setFailure] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    React.useEffect(() => {
        if (type === 'Money') {
            dispatch(fetchTakenMoney())
        }
        else if (type === 'Items') {
            dispatch(fetchTakenItems());
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
    }, [token]);
    const moneyHeaders = ['Action', 'Amount', 'Name', 'Place', 'Expected Return Date', 'Status'];
    const itemHeaders = ['Action', 'Item', 'Name', 'Place', 'Expected Return Date', 'Status',];
    if (type === 'Items') {
        return (
            <Container maxWidth="xl">
                <Heading heading={`Taken ${type}`} />
                <div className={classes.toolbar} />
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
                                            <TableCell key={index} className={classes.margin}>
                                                {cell}
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                takes.takenItems.map((item, index) => {
                                    return (
                                        <TakenItem
                                            key={index}
                                            itemName={item.itemName}
                                            description={item.description}
                                            borrower={item.borrower}
                                            place={item.place}
                                            occasion={item.occasion}
                                            expected_return_date={item.expected_return_date}
                                            status={item.status}
                                            actual_return_date={item.actual_return_date}
                                            _id={item.id}
                                        />
                                    );
                                })
                            }
                            {
                                takes.takenItems.length === 0 ? <EmptyRow type={type} /> : <React.Fragment />
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
                        onClick={() => dispatch(fetchTakenItems())}
                    > Refresh </Button>
                </Box>
                <SuccessSnack open={success} setOpen={setSuccess} message={token.message} />
                <FailureSnack open={failure} setOpen={setFailure} message={token.message} />
            </Container>
        );
    }
    else if (type === 'Money') {
        return (
            <Container maxWidth="xl">
                <Heading heading={`Taken ${type}`} />
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
                                takes.takenMoney.map((money, index) => {
                                    return (
                                        <TakenMoney
                                            key={index}
                                            amount={money.amount}
                                            borrower={money.borrower}
                                            place={money.place}
                                            occasion={money.occasion}
                                            expected_return_date={money.expected_return_date}
                                            status={money.status}
                                            actual_return_date={money.actual_return_date}
                                            _id={money.id}
                                        />
                                    );
                                })
                            }
                            {
                                takes.takenMoney.length === 0 ? <EmptyRow type={type} /> : <React.Fragment />
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
                        onClick={() => dispatch(fetchTakenMoney())}
                    > Refresh </Button>
                </Box>
                <SuccessSnack open={success} setOpen={setSuccess} message={token.message} />
                <FailureSnack open={failure} setOpen={setFailure} message={token.message} />
            </Container>
        );
    }
    else
        return (
            <Container maxWidth="xl" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
            </Container>
        );
}

const TakenMoney = ({ amount, borrower, place, occasion, expected_return_date, status, actual_return_date, _id }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [validate, setValidate] = React.useState(false);
    const dispatch = useDispatch();
    const handleViewToken = () => {
        dispatch(getToken(_id));
    }
    const handleReturn = () => {
        axios.post(`${config.baseurl}borrow/borrowMoney/${_id}/return`)
            .then(response => {
                setValidate(true);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleReject = () => {
        dispatch(rejectBorrow(_id, 'money'));
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
        <ValidateDialog open={validate} setOpen={setValidate} page={'money'} borrowId={_id} type={'return'} />
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
                {borrower.name}
                <Tooltip enterTouchDelay={100} title={borrower.username}>
                    <IconButton aria-label={borrower.username} size="large">
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
                    <IconButton aria-label={borrower.username} size="large">
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
                        {status === 0 ? <Button
                            className={classes.button}
                            style={{ backgroundColor: red[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<HighlightOffIcon />}
                            type="button"
                            onClick={handleReject}
                        > Reject </Button> : ''}
                        <span className={classes.button} />

                        {status === "APPROVED" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: green[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<ExitToAppOutlinedIcon />}
                            type="button"
                            onClick={handleReturn}
                        > Return </Button> : ''}
                        {status === "REJECTED" ? <Typography display="block" className={classes.button} style={{ color: red[500], fontWeight: 'bolder' }}> You rejected the borrow!</Typography> : ''}
                        {status === "RETURNED" ? <Typography display="block" className={classes.button} style={{ color: indigo[500], fontWeight: 'bolder' }}> You returned the borrow!</Typography> : ''}
                        {status === "PENDING" ? <Button
                            className={classes.button}
                            style={{ backgroundColor: indigo[500], color: 'white' }}
                            variant="outlined"
                            endIcon={<CodeRoundedIcon />}
                            type="button"
                            onClick={handleViewToken}
                        > View Token </Button> : ''}
                        <span className={classes.button} />

                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
);
}

const TakenItem = ({ itemName, description, borrower, place, occasion, expected_return_date, actual_return_date, status, _id }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [validate, setValidate] = React.useState(false);
    const [tokenOp, setTokenOp] = React.useState(false);
    const token = useSelector(state => state.token.secretToken);
    const dispatch = useDispatch();
    const handleViewToken = () => {
        dispatch(getToken(_id));
        setTimeout(() => setTokenOp(true), 1000);
    }
    const handleReturn = () => {
        axios.post(`${config.baseurl}borrow/borrowItem/${_id}/return`)
            .then(response => {
                setValidate(true);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleReject = () => {
        dispatch(rejectBorrow(_id, 'items'));
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
            <ValidateDialog open={validate} setOpen={setValidate} page={'items'} borrowId={_id} type={'return'} />
            <TokenDialog open={tokenOp} setOpen={setTokenOp} message={token} />
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
                    {borrower.name}
                    <Tooltip title={borrower.username} enterTouchDelay={100}>
                        <IconButton aria-label={borrower.username} size="large">
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
                        <IconButton aria-label={borrower.username} size="large">
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
                                style={{ backgroundColor: red[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<HighlightOffIcon />}
                                type="button"
                                onClick={handleReject}
                            > Reject </Button> : ''}
                            <span className={classes.button} />
                            {status === "REJECTED" ? <Typography display="block" className={classes.button} style={{ color: red[500], fontWeight: 'bolder' }}> You rejected the borrow!</Typography> : ''}
                            {status === "RETURNED" ? <Typography display="block" className={classes.button} style={{ color: indigo[500], fontWeight: 'bolder' }}> You returned the borrow!</Typography> : ''}

                            {status === "APPROVED" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: green[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<ExitToAppOutlinedIcon />}
                                type="button"
                                onClick={handleReturn}
                            > Return </Button> : ''}
                            {status === "PENDING" ? <Button
                                className={classes.button}
                                style={{ backgroundColor: indigo[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<CodeRoundedIcon />}
                                type="button"
                                onClick={handleViewToken}
                            > View Token </Button> : ''}
                            <span className={classes.button} />

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
                <Typography variant="body1" align="center" display="block" style={{ color: red[500], fontWeight: 'bolder' }}> You have not taken any {type} .</Typography>
                <Box margin={1} textAlign="center">
                    <Button href={`/dashboard/`} variant="outlined" size="large" color="primary">
                        Start Helping To Get Back
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default Takes;