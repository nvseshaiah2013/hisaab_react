import React, { useEffect } from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGivenItems, fetchGivenMoney } from '../redux/ActionCreators';
import moment from 'moment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
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
    },
    header: {
        borderBottom: `3px solid ${theme.palette.info.dark}`,
        marginBottom: theme.spacing(2),
        '& :hover': {
            borderColor: theme.palette.info.light
        }
    }
}));

const Gives = ({ type }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const gives = useSelector(state => state.gives);

    useEffect(() => {
        if(type === 'Money') {
            dispatch(fetchGivenMoney());
        }
        else if(type === 'Items'){
            dispatch(fetchGivenItems());
        }
    },[type, dispatch]);
    if (type === 'Money') {
        return (
            <Container maxWidth="lg" className={classes.content}>
                <Typography variant="h4" align="center" display="block" className={classes.header}> Given {type} </Typography>
                <div className={classes.flexBox}>               
                {
                    gives.givenMoney.map((money, index)=> {
                        return (
                            <GivenMoney 
                                key={index} 
                                amount={money.amount} 
                                borowee={money.borowee}
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
    else if (type === 'Items') {
        return (
            <Container maxWidth="lg" className={classes.content}>
                <Typography variant="h4" align="center" display="block" className={classes.header}> Given {type} </Typography>
                <div className={classes.flexBox}>
                {
                    gives.givenItems.map((money, index)=> {
                        return (
                            <GivenItem 
                                key={index} 
                                itemName={money.itemName}
                                description={money.description}
                                borowee={money.borowee}
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
            <Typography variant="h4" align="center" display="block" className={classes.header}> Given {type} </Typography>
            <Typography>Wrong Entity</Typography>
        </Container>
    );
}

const GivenMoney = ({ amount, borowee, place, occasion, expected_return_date }) => {
    const classes = useStyles();
    return (
        <div className={classes.box}>
            <Typography display="block" variant="h5"> Given Amount : <MonetizationOnIcon /> {amount}</Typography>
            <Divider />
            <Typography variant="h6" display="block"> Occasion : {occasion}</Typography>
            <Typography variant="body1" display="block"> Given Place : {place}</Typography>
            <Typography variant="body1" display="block">  Expected Return Date : {moment(expected_return_date).format('DDD, MMM, YYYY')}</Typography>
            <Divider />
            <Typography variant="body1">Given To : </Typography>
            <Typography variant="body2">{borowee.name}</Typography>
            <Typography display="block" variant="subtitle1">{borowee.username}</Typography>
        </div>
    );
}

const GivenItem = ({ itemName, description ,borowee, place, occasion, expected_return_date, key }) => {
    const classes = useStyles();
    return (
        <div key={key} className={classes.box}>
            {itemName}
            {description}
            {occasion}
            {JSON.stringify(borowee)}
            {place}
            {new Date(expected_return_date).toISOString()}
        </div>
    );
}

export default Gives;