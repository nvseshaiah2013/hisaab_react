import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, CLEAR_LOGIN_ERROR } from './ActionTypes';

export const Auth = (
    state = {
                isAuthenticated : localStorage.getItem('token') ? true : false,
                errMess : null,
                token : localStorage.getItem('token'),
                username : localStorage.getItem('username')
            }, action) => {
        switch(action.type) {
            case LOGIN : return {...state, username : action.payload };
            case LOGIN_SUCCESS : return {...state, isAuthenticated : true, token : action.payload  };
            case LOGIN_FAILED : return {...state, isAuthenticated : false, errMess : action.payload, token : null };
            case CLEAR_LOGIN_ERROR : return { ...state, errMess : null  };
            case LOGOUT : return { ...state, isAuthenticated : false, token : null , username : null }
            default : return state;
        }
}