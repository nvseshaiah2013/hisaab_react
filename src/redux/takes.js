import { TAKES_LOADING, FETCH_TAKEN_ITEMS, FETCH_TAKEN_MONEY, TAKE_ERROR } from './ActionTypes';


export const Takes = (state = { 
    takenMoney : [],
    takenItems : [],
    status : null,
    message : null,
    isLoading : false
}, action) => {
    switch(action.type) {
        case FETCH_TAKEN_ITEMS : return { ...state, isLoading : false, takenItems : action.payload.borrows  };
        case FETCH_TAKEN_MONEY : return { ...state, isLoading : false, takenMoney : action.payload.borrows };
        case TAKES_LOADING : return { ...state, isLoading : true };
        case TAKE_ERROR : return { ...state, message : action.payload.message, status : action.payload.status, isLoading : false  };
        default : return state;
    }
}