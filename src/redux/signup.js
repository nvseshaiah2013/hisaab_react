import { SIGNUP, SIGNUP_FAILED, SIGNUP_SUCCESS } from './ActionTypes';

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
                case SIGNUP_SUCCESS : return {...state, status : action.payload.status, message : action.payload.message };
                case SIGNUP_FAILED : return {...state, status : action.payload.status, message : action.payload.message };
                default : return state;
            }
}