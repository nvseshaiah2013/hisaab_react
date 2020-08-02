import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './ActionTypes';

export const Auth = (
    state = {
                isAuthenticated : localStorage.getItem('token') ? true : false,
                errMess : null,
                token : localStorage.getItem('token'),
                username : localStorage.getItem('username'),
                isLoading : false
            }, action) => {
        switch(action.type) {
            case LOGIN : return {...state, username : action.payload };
            case LOGIN_SUCCESS : return {...state, isAuthenticated : true, token : action.payload, isLoading : false  };
            case LOGIN_FAILED : return {...state, isAuthenticated : false, errMess : action.payload.message, token : null, isLoading : false };
            case LOGOUT : return { ...state, isAuthenticated : false, token : null , username : null }
            default : return state;
        }
}