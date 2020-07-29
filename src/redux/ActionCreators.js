import axios from 'axios';
import * as ActionTypes from './ActionTypes';
import { baseurl } from '../resources/baseurl';

export const login = (username, password) => dispatch => {
    dispatch({ type: ActionTypes.LOGIN, payload: username });
    axios.post(`${baseurl}users/login`, { username: username, password: password })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data.token })
        })
        .catch(err => dispatch({ type: ActionTypes.LOGIN_FAILED, payload: err.response.data.message }))
}

export const signup = (name, username, password) => dispatch => {
    dispatch({ type: ActionTypes.SIGNUP, payload: username });
    axios.post(`${baseurl}users/signup`, { username: username, name: name, password: password })
        .then((response) => {
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: { status: response.data.status, message: response.data.message } })
        })
        .catch(err => dispatch({ type: ActionTypes.SIGNUP_FAILED, payload: { status: err.response.data.status, message: err.response.data.message } }))
}

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` || null;

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch({ type: ActionTypes.LOGOUT });
}


// Gives Creators

export const selectedFriend = (username, name) => dispatch => {
    dispatch({ type: ActionTypes.SELECT_FRIEND, payload: { username, name } });
}

export const clearFriend = () => dispatch => {
    dispatch({ type: ActionTypes.DESELET_FRIEND });
}


const clearGiveMessage = () => ({type : ActionTypes.CLEAR_GIVE_MESSAGE });
const givesLoading = () => ({ type : ActionTypes.GIVES_LOADING });
const clearTakeMessage = () => ({type: ActionTypes.CLEAR_TAKE_MESSAGE });
const takesLoading = () => ({ type : ActionTypes.TAKES_LOADING });

export const givemoney = (moneyForm, friend ) => dispatch => {
    let money = { 
        borowee : friend.username,
        expectedReturnDate : moneyForm.expected_return_date,
        amount : moneyForm.amount,
        occasion : moneyForm.occasion,
        place : moneyForm.place
    };
    axios.post(baseurl + 'borrow/borrowMoney', money )
        .then(response => {
            dispatch({type : ActionTypes.GIVE_MONEY, payload : response.data });
        })
        .catch(err=> {
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearGiveMessage()), 4000);
        })
}

export const giveitem = (itemForm, friend ) => dispatch => {
    let item = { 
        borowee : friend.username,
        expectedReturnDate : itemForm.expected_return_date,
        itemName : itemForm.itemName,
        description : itemForm.description,
        occasion : itemForm.occasion,
        place : itemForm.place
    };
    axios.post(baseurl + 'borrow/borrowItem', item )
        .then(response => {
            dispatch({type : ActionTypes.GIVE_ITEM, payload : response.data });
        })
        .catch(err=> {
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchGivenMoney = (pageNo=1) => dispatch => {
    dispatch(givesLoading());
    axios.get(`${baseurl}borrow/borrowMoney`, { params : { pageNo }})
        .then(response => {
            dispatch({type : ActionTypes.FETCH_GIVEN_MONEY, payload : response.data });
        })
        .catch(err=> {
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchGivenItems = (pageNo=1) => dispatch => {
    dispatch(givesLoading());
    axios.get(`${baseurl}borrow/borrowItem`, { params : { pageNo }} )
        .then(response => {
            dispatch({type : ActionTypes.FETCH_GIVEN_ITEMS, payload : response.data });
        })
        .catch(err=> {
            console.log(err.response);
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchTakenItems = (pageNo=1) => dispatch => {
    dispatch(takesLoading());
    axios.get(`${baseurl}borrow/takenItems`, { params : { pageNo }})
        .then(response => {
            dispatch({type : ActionTypes.FETCH_TAKEN_ITEMS, payload : response.data });
        })
        .catch(err=> {
            dispatch({type : ActionTypes.TAKE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearTakeMessage()), 4000);
        });
}

export const fetchTakenMoney = (pageNo=1) => dispatch => {
    dispatch(takesLoading());
    axios.get(`${baseurl}borrow/takenMoney`, { params : { pageNo }})
        .then(response => {
            dispatch({type : ActionTypes.FETCH_TAKEN_MONEY, payload : response.data });
        })
        .catch(err=> {
            dispatch({type : ActionTypes.TAKE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(()=> dispatch(clearTakeMessage()), 4000);
        });
}