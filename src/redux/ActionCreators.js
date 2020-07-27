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

export const clearError = () => dispatch => {
    dispatch({ type: ActionTypes.CLEAR_LOGIN_ERROR });
}

export const signup = (name, username, password) => dispatch => {
    dispatch({ type: ActionTypes.SIGNUP, payload: username });
    axios.post(`${baseurl}users/signup`, { username: username, name: name, password: password })
        .then((response) => {
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: { status: response.data.status, message: response.data.message } })
        })
        .catch(err => dispatch({ type: ActionTypes.SIGNUP_FAILED, payload: { status: err.response.data.status, message: err.response.data.message } }))
}

axios.interceptors.request.use(function (config) {
    let exceptions = [`${baseurl}users/login`,`${baseurl}users/signup`];
    if(exceptions.indexOf(config.url) > -1 ){
        return config;
    }
    if(localStorage.getItem('token') == null){
        throw new Error('JWT Error');
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

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
            dispatch({type : ActionTypes.GIVE_MONEY, payload : response.data.borrow });
            console.log(response.data.borrow);
        })
        .catch(err=> {
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data.message })
        });
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
            dispatch({type : ActionTypes.GIVE_ITEM, payload : response.data.borrow });
            console.log(response.data.borrow);
        })
        .catch(err=> {
            dispatch({type : ActionTypes.GIVE_ERROR, payload : err.response.data.message })
        });
}