import axios from 'axios';
import * as ActionTypes from './ActionTypes';
import { baseurl } from '../resources/baseurl';

export const login = (username,password) => dispatch => {
    dispatch({type : ActionTypes.LOGIN, payload : username });
    axios.post(`${baseurl}users/login`,{ username : username , password : password })
        .then((response)=>{
            console.log(response);
            dispatch({ type : ActionTypes.LOGIN_SUCCESS, payload : response.data.token })
        })
        .catch(err=> dispatch({ type : ActionTypes.LOGIN_FAILED, payload : err.message }))
}

export const signup = (name, username, password ) => dispatch => {
    dispatch({type : ActionTypes.SIGNUP, payload : username });
    axios.post(`${baseurl}users/signup`,{ username : username, name : name , password : password })
        .then((response) => {
            console.log(response);
            dispatch({type : ActionTypes.SIGNUP_SUCCESS, payload : { status : response.data.status, message : response.data.message }})
        })
        .catch(err=> dispatch({ type : ActionTypes.SIGNUP_FAILED, payload : { status : err.status , message : err.message }  }))
}