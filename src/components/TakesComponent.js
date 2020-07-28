import React, { useEffect } from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { fetchTakenItems, fetchTakenMoney } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    header: {
        borderBottom: `3px solid ${theme.palette.info.dark}`,
        marginBottom: theme.spacing(2),
        '& :hover': {
            borderColor: theme.palette.info.light
        }
    },
    content: {
        paddingTop: theme.spacing(3),
        paddingBottom : theme.spacing(3),
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2)
    },
    flexBox : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    },
    box : {
        padding: theme.spacing(3),
        boxShadow : theme.shadows[2],
        borderRadius: '5px',
        borderColor : theme.palette.info.light,
        flexGrow : 1,
        borderWidth : '2px',
        borderStyle : 'solid'
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
    if (type === 'Items') {
        return (
            <Container maxWidth="md" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
                <div className={classes.flexBox}>
                {
                    takes.takenItems.map((money, index)=> {
                        return (
                            <TakenItem 
                                key={index} 
                                itemName={money.itemName}
                                description={money.description}
                                borrower={money.borrower}
                                place={money.place}
                                occasion={money.occasion}
                                expected_return_date={money.expected_return_date}
                                />
                        );
                    })
                }
            </div>
            </Container>
        );
    }
    else if (type === 'Money') {
        return (
            <Container maxWidth="md" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
                <div className={classes.flexBox}>
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
                                />
                            );
                        })
                    }
                </div>
            </Container>
        );
    }
    else
        return (
            <Container maxWidth="md" className={classes.content}>
                <Typography variant="h4" align="center" className={classes.header}>Taken {type}</Typography>
            </Container>
        );
}

const TakenMoney = ({ amount, borrower, place, occasion, expected_return_date }) => {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <Typography display="block" variant="h5"> Given Amount :  {amount}</Typography>
            <Divider />
            <Typography variant="h6" display="block"> Occasion : {occasion}</Typography>
            <Typography variant="body1" display="block"> Given Place : {place}</Typography>
            <Typography variant="body1" display="block">  Expected Return Date : {moment(expected_return_date).format('DDD, MMM, YYYY')}</Typography>
            <Divider />
            <Typography variant="body1">Given To : </Typography>
            <Typography variant="body2">{borrower.name}</Typography>
            <Typography display="block" variant="subtitle1">{borrower.username}</Typography>
        </div>
    );
}

const TakenItem = ({ itemName, description, borrower, place, occasion, expected_return_date, key }) => {
    const classes = useStyles();
    return (
        <div key={key} className={classes.box}>
            {itemName}
            {description}
            {occasion}
            {JSON.stringify(borrower)}
            {place}
            {new Date(expected_return_date).toISOString()}
        </div>
    );
}

export default Takes;