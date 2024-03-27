import { TOKEN_ERROR , TOKEN_LOADING , CLEAR_TOKEN, GENERATE_TOKEN, GET_TOKEN, VALIDATE_BORROW, VALIDATE_RETURN, CLEAR_TOKEN_MESSAGE, REJECT_BORROW } from './ActionTypes';

export const Token = (state = 
    {
        secretToken : null,
        isLoading : false,
        message  : null,
        status  : null,
        code : null
    }    
    , action ) => {
        switch(action.type) {
            case TOKEN_ERROR : return { ...state, isLoading : false, status : action.payload.status , message : action.payload.message };
            case CLEAR_TOKEN_MESSAGE : return { ...state, status : null, message :  null};
            case TOKEN_LOADING : return { ...state, isLoading : true };
            case CLEAR_TOKEN : return { ...state, isLoading : false, secretToken : null };
            case GENERATE_TOKEN : return { ...state, isLoading : false, message : action.payload.message, status : action.payload.status, code : action.payload.payload.code };
            case GET_TOKEN : return { ...state, isLoading : false, secretToken : action.payload.payload.token, status : action.payload.status, message : action.payload.message };
            case VALIDATE_BORROW : return { ...state, isLoading : false, status : action.payload.status, message : action.payload.message };
            case VALIDATE_RETURN : return { ...state, isLoading : false, status : action.payload.status, message : action.payload.message };
            case REJECT_BORROW : return {...state, isLoading : false, status : action.payload.status, message : action.payload.message };
            default : return state;
        }
}