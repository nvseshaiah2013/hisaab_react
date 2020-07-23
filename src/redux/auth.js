import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from './ActionTypes';

export const Auth = (
    state = {
                isAuthenticated : false,
                errMess : null,
                token : null,
                username : null
            }, action) => {
        switch(action.type) {
            case LOGIN : return {...state, username : action.payload };
            case LOGIN_SUCCESS : return {...state, isAuthenticated : true, token : action.payload  };
            case LOGIN_FAILED : return {...state, isAuthenticated : false, errMess : action.payload }
            default : return state;
        }
}