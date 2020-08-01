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

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` || null;

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


const clearGiveMessage = () => ({ type: ActionTypes.CLEAR_GIVE_MESSAGE });
const givesLoading = () => ({ type: ActionTypes.GIVES_LOADING });
const clearTakeMessage = () => ({ type: ActionTypes.CLEAR_TAKE_MESSAGE });
const takesLoading = () => ({ type: ActionTypes.TAKES_LOADING });

export const givemoney = (moneyForm, friend) => dispatch => {
    let money = {
        borowee: friend.username,
        expectedReturnDate: moneyForm.expected_return_date,
        amount: moneyForm.amount,
        occasion: moneyForm.occasion,
        place: moneyForm.place
    };
    axios.post(baseurl + 'borrow/borrowMoney', money)
        .then(response => {
            dispatch({ type: ActionTypes.GIVE_MONEY, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        })
}

export const giveitem = (itemForm, friend) => dispatch => {
    let item = {
        borowee: friend.username,
        expectedReturnDate: itemForm.expected_return_date,
        itemName: itemForm.itemName,
        description: itemForm.description,
        occasion: itemForm.occasion,
        place: itemForm.place
    };
    axios.post(baseurl + 'borrow/borrowItem', item)
        .then(response => {
            dispatch({ type: ActionTypes.GIVE_ITEM, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchGivenMoney = (pageNo = 1) => dispatch => {
    dispatch(givesLoading());
    axios.get(`${baseurl}borrow/borrowMoney`, { params: { pageNo } })
        .then(response => {
            dispatch({ type: ActionTypes.FETCH_GIVEN_MONEY, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchGivenItems = (pageNo = 1) => dispatch => {
    dispatch(givesLoading());
    axios.get(`${baseurl}borrow/borrowItem`, { params: { pageNo } })
        .then(response => {
            dispatch({ type: ActionTypes.FETCH_GIVEN_ITEMS, payload: response.data });
        })
        .catch(err => {
            console.log(err.response);
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        });
}

export const fetchTakenItems = (pageNo = 1) => dispatch => {
    dispatch(takesLoading());
    axios.get(`${baseurl}borrow/takenItems`, { params: { pageNo } })
        .then(response => {
            dispatch({ type: ActionTypes.FETCH_TAKEN_ITEMS, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TAKE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTakeMessage()), 4000);
        });
}

export const fetchTakenMoney = (pageNo = 1) => dispatch => {
    dispatch(takesLoading());
    axios.get(`${baseurl}borrow/takenMoney`, { params: { pageNo } })
        .then(response => {
            dispatch({ type: ActionTypes.FETCH_TAKEN_MONEY, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TAKE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTakeMessage()), 4000);
        });
}

// Token Actions

const isLoadingToken = () => ({ type: ActionTypes.TOKEN_LOADING });
const clearTokenMessage = () => ({ type: ActionTypes.CLEAR_TOKEN_MESSAGE });
export const clearToken = () => ({ type: ActionTypes.CLEAR_TOKEN });

export const validateBorrow = (secretToken, borrowId, type) => dispatch => {
    dispatch(isLoadingToken());
    axios.post(`${baseurl}borrow/validateborrow/${borrowId}`, { secretToken })
        .then(response => {
            dispatch({ type: ActionTypes.VALIDATE_BORROW, payload: response.data });
            if (type === 'money') {
                dispatch(fetchGivenMoney());
            }
            else if (type === 'items') {
                dispatch(fetchGivenItems());
            }
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TOKEN_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTokenMessage()), 4000);
        });
}

export const rejectBorrow = (borrowId, type) => dispatch => {
    dispatch(isLoadingToken());
    axios.post(`${baseurl}borrow/reject/${borrowId}`)
        .then(response => {
            dispatch({ type: ActionTypes.REJECT_BORROW, payload: response.data });
            if (type === 'money') {
                dispatch(fetchTakenMoney());
            }
            else if (type === 'items') {
                dispatch(fetchTakenItems());
            }
        })
        .catch(err => dispatch({ type: ActionTypes.TOKEN_ERROR, payload: err.response.data }))
        .finally(() => {
            setTimeout(() => dispatch(clearTokenMessage()), 4000);
        });
}

export const validateReturn = (secretToken, borrowId, type) => dispatch => {
    dispatch(isLoadingToken());
    axios.post(`${baseurl}borrow/validatereturn/${borrowId}`, { secretToken })
        .then(response => {
            dispatch({ type: ActionTypes.VALIDATE_RETURN, payload: response.data });
            if (type === 'money') {
                dispatch(fetchTakenMoney());
            }
            else if (type === 'items') {
                dispatch(fetchTakenItems());
            }
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TOKEN_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTokenMessage()), 4000);
        });
}

export const getToken = (borrowId) => dispatch => {
    dispatch(isLoadingToken());
    axios.get(`${baseurl}token/${borrowId}`)
        .then(response => {
            dispatch({ type: ActionTypes.GET_TOKEN, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TOKEN_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTokenMessage()), 4000);
        });
}

export const generateToken = (borrowId) => dispatch => {
    dispatch(isLoadingToken());
    axios.post(`${baseurl}token/${borrowId}`)
        .then(response => {
            dispatch({ type: ActionTypes.GENERATE_TOKEN, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.TOKEN_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearTokenMessage()), 4000);
        });
}

export const deleteBorrowMoney = (borrowId) => dispatch => {
    dispatch(givesLoading());
    axios.delete(`${baseurl}borrow/borrowMoney/${borrowId}`)
        .then(response => {
            dispatch(fetchGivenMoney(1));
        })
        .catch(err=> {
            dispatch({ type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()),4000);
        })
}

export const deleteBorrowItem = (borrowId) => dispatch => {
    dispatch(givesLoading());
    axios.delete(`${baseurl}borrow/borrowItem/${borrowId}`)
        .then(response => {
            dispatch(fetchGivenItems(1));
        })
        .catch(err=> {
            dispatch({ type : ActionTypes.GIVE_ERROR, payload : err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()),4000);
        })
}

export const updateBorrowMoney = (borrowId, values) => dispatch => {
    let money = {
        expectedReturnDate: values.expected_return_date,
        amount: values.amount,
        occasion: values.occasion,
        place: values.place
    };
    axios.put(`${baseurl}borrow/borrowMoney/${borrowId}`, money)
        .then(response => {
            dispatch({ type: ActionTypes.UPDATE_GIVE_MONEY, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response ? err.response.data : { status : 0, message : 'Unknown Error'} });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        })
}

export const updateBorrowItem = (borrowId, values) => dispatch => {
    let item = {
        expectedReturnDate: values.expected_return_date,
        itemName: values.itemName,
        description: values.description,
        occasion: values.occasion,
        place: values.place
    };
    axios.put(`${baseurl}borrow/borrowItem/${borrowId}`, item)
        .then(response => {
            dispatch({ type: ActionTypes.UPDATE_GIVE_ITEM, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ActionTypes.GIVE_ERROR, payload: err.response.data });
        })
        .finally(() => {
            setTimeout(() => dispatch(clearGiveMessage()), 4000);
        });
}

// Reminders Reducer  Creators 

const reminderLoading = () => ({ type : ActionTypes.REMINDER_LOADING });
const reminderClearMessage = () => ({ type : ActionTypes.CLEAR_REMINDER_MESSAGE });

export const sendReminder = (borrowId, reminder) => dispatch => {
    dispatch(reminderLoading());
    let reminderObj = { 
        borrowId : borrowId,
        header : reminder.header,
        message : reminder.message
    }
    axios.post(`${baseurl}reminder/sent`,reminderObj )
        .then(response => {
            dispatch({ type : ActionTypes.SEND_REMINDER, payload : response.data })
        })
        .catch(err => {
            dispatch({type : ActionTypes.REMINDER_ERROR , payload: err.response ? err.response.data : { status : 0, message : 'Unknown Error'} });
        })
        .finally(() => {
            setTimeout(()=> dispatch(reminderClearMessage()));
        })
}

export const fetchSentReminders = (pageNo=1) => dispatch => {
    dispatch(reminderLoading());
    axios.get(`${baseurl}reminder/sent`)
        .then(response => {
            dispatch({ type : ActionTypes.FETCH_SENT_REMINDERS, payload : response.data })
        })
        .catch(err => {
            dispatch({type : ActionTypes.REMINDER_ERROR , payload: err.response ? err.response.data : { status : 0, message : 'Unknown Error'} });
        })
        .finally(() => {
            setTimeout(()=> dispatch(reminderClearMessage()));
        })
}

export const fetchReceivedReminders = (pageNo=1) => dispatch => {
    dispatch(reminderLoading());
    axios.get(`${baseurl}reminder/received`)
        .then(response => {
            dispatch({ type : ActionTypes.FETCH_RECEIVED_REMINDERS, payload : response.data })
        })
        .catch(err => {
            dispatch({type : ActionTypes.REMINDER_ERROR , payload: err.response ? err.response.data : { status : 0, message : 'Unknown Error'} });
        })
        .finally(() => {
            setTimeout(()=> dispatch(reminderClearMessage()));
        })
}