import { SIGNUP, SIGNUP_FAILED, SIGNUP_SUCCESS, CLEAR_SIGNUP_MESSAGE, SIGNUP_LOADING, CHANGE_PASSWORD, CLEAR_FORGOT_PASSWORD_MESSAGE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_LOADING, RESET_PASSWORD_CLEAR_MESSAGE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST_LOADING } from './ActionTypes';

export const Signup = (
            state = {
                status : null,
                message : null,
                username : null
            }, 
            action ) => {
            switch(action.type)
            {
                case SIGNUP : return { ...state, username : action.payload };
                case SIGNUP_SUCCESS : return {...state, status : action.payload.status, message : action.payload.message, isLoading : false };
                case SIGNUP_FAILED : return {...state, status : action.payload.status, message : action.payload.message, isLoading : false };
                case CLEAR_SIGNUP_MESSAGE : return { ...state, status : null, message : null };
                case SIGNUP_LOADING : return { ...state, isLoading : true };
                case CHANGE_PASSWORD : return { ...state, status : action.payload.status, message : action.payload.message, isLoading :false };
                case CLEAR_FORGOT_PASSWORD_MESSAGE : return { ...state, status : null, message : null };
                case FORGOT_PASSWORD_REQUEST : return { ...state, status : action.payload.status, message : action.payload.message, isLoading :false };
                case FORGOT_PASSWORD_LOADING : return {...state, isLoading : true}; 
                case RESET_PASSWORD_CLEAR_MESSAGE : return { ...state, status : null, message : null };
                case RESET_PASSWORD_REQUEST : return { ...state, status : action.payload.status, message : action.payload.message, isLoading :false };
                case RESET_PASSWORD_REQUEST_LOADING : return {...state, isLoading : true}; 
                default : return state;
            }
}