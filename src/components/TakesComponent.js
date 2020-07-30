import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Button, Collapse, Box, Typography, Table, TableBody, TableContainer, TableCell, TableRow, TableHead, Tooltip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { fetchTakenItems, fetchTakenMoney } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import Legend from './LegendComponent';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: `3px solid ${theme.palette.info.dark}`,
        marginBottom: '1rem',
        paddingBottom: '1rem'
    },
    content: {
        padding: theme.spacing(3),
    },
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
    const takes = useSelector(state => state.takes);
    useEffect(() => {
        if (type === 'Money') {
            dispatch(fetchTakenMoney())
        }
        else if (type === 'Items') {
            dispatch(fetchTakenItems());
        }
    }, [type, dispatch]);
    const moneyHeaders = ['Action', 'Amount', 'Name', 'Place', 'Expected Return Date', 'Status'];
    const itemHeaders = ['Action', 'Item', 'Name', 'Place', 'Expected Ret. Date.', 'Status',];
    if (type === 'Items') {
        return (
            <Container maxWidth="xl" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
                <div className={classes.toolbar} />
                <Legend />
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
            </Container>
        );
    }
    else if (type === 'Money') {
        return (
            <Container maxWidth="xl" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
                <div className={classes.toolbar} />
                <Legend />
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

const TakenMoney = ({ amount, borrower, place, occasion, expected_return_date, status, actual_return_date }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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
    } return (
        <React.Fragment>
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
                        <IconButton aria-label={borrower.username}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {place}
                    <Tooltip enterTouchDelay={100} title={occasion}>
                        <IconButton aria-label={occasion}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {moment(expected_return_date).format('Do, MMM, YYYY')}
                    <Tooltip enterTouchDelay={100} title={actual_return_date ? `Returned On : ${moment(actual_return_date).format('Do, MMM, YYYY')}` : 'Not Returned'}>
                        <IconButton aria-label={borrower.username}>
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
                            <span className={classes.button} />

                            {status === 1 ? <Button
                                className={classes.button}
                                style={{ backgroundColor: green[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<ExitToAppOutlinedIcon />}
                            > Return </Button> : ''}

                            {status === 0 ? <Button
                                className={classes.button}
                                style={{ backgroundColor: indigo[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<CodeRoundedIcon />}
                            > View Token </Button> : ''}
                            <span className={classes.button} />

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TakenItem = ({ itemName, description, borrower, place, occasion, expected_return_date, actual_return_date, status }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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
        <React.Fragment>
            <TableRow hover>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {itemName}
                    <Tooltip title={description} enterTouchDelay={100}>
                        <IconButton aria-label={description}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    {borrower.name}
                    <Tooltip title={borrower.username} enterTouchDelay={100}>
                        <IconButton aria-label={borrower.username}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {place}
                    <Tooltip title={`Occasion : ${occasion}`} enterTouchDelay={100}>
                        <IconButton aria-label={`Occasion : ${occasion}`}>
                            <InfoRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    {moment(expected_return_date).format('Do, MMM, YYYY')}
                    <Tooltip enterTouchDelay={100} title={actual_return_date ? `Returned On : ${moment(actual_return_date).format('Do, MMM, YYYY')}` : 'Not Returned'}>
                        <IconButton aria-label={borrower.username}>
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
                            <span className={classes.button} />

                            {status === 1 ? <Button
                                className={classes.button}
                                style={{ backgroundColor: green[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<ExitToAppOutlinedIcon />}
                            > Return </Button> : ''}
                            {status === 0 ? <Button
                                className={classes.button}
                                style={{ backgroundColor: indigo[500], color: 'white' }}
                                variant="outlined"
                                endIcon={<CodeRoundedIcon />}
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