import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, CLEAR_LOGIN_MESSAGE } from './ActionTypes';

export const Auth = (
    state = {
                isAuthenticated : localStorage.getItem('token') != 'undefined' && localStorage.getItem('token') ? true : false,
                errMess : null,
                token : localStorage.getItem('token') != 'undefined' ? localStorage.getItem('token') : undefined,
                username : localStorage.getItem('username'),
                isLoading : false,
                name : null
            }, action) => {
        switch(action.type) {
            case LOGIN : return {...state, username : action.payload };
            case LOGIN_SUCCESS : return {...state, isAuthenticated : true, token : action.payload.payload.token, name: action.payload.payload.name, isLoading : false  };
            case LOGIN_FAILED : return {...state, isAuthenticated : false, errMess : action.payload.errorMessage, token : null, isLoading : false };
            case LOGOUT : return { ...state, isAuthenticated : false, token : null , username : null }
            case CLEAR_LOGIN_MESSAGE : return {...state, errMess: null}
            default : return state;
        }
}