import { SELECT_FRIEND, DESELET_FRIEND, GIVE_MONEY, GIVE_ERROR, GIVE_ITEM, CLEAR_GIVE_MESSAGE, FETCH_GIVEN_MONEY, FETCH_GIVEN_ITEMS, GIVES_LOADING } from './ActionTypes';

export const Gives = (state = {
    selectedFriend: null,
    givenMoney: [],
    givenItems: [],
    isLoading: false,
    givenItem: null,
    givenAmount: null,
    message : null,
    status : null
}, action) => {
    switch (action.type) {
        case SELECT_FRIEND : return { ...state, selectedFriend : action.payload };
        
        case DESELET_FRIEND : return { ...state, selectedFriend : null };
        
        case GIVE_MONEY : return { ...state, givenAmount : action.payload.borrow, status : action.payload.status, message : action.payload.message };
        
        case FETCH_GIVEN_MONEY : return { ...state, isLoading : false, givenMoney : action.payload.borrows };

        case GIVE_ITEM : return { ...state, givenItem : action.payload.borrow, status : action.payload.status, message : action.payload.message };
        
        case FETCH_GIVEN_ITEMS : return  { ...state, givenItems  : action.payload.borrows };

        case GIVE_ERROR : return { ...state, message : action.payload.message, status : action.payload.status, isLoading : false };
        
        case CLEAR_GIVE_MESSAGE: return { ...state, status : null , message : null };

        case GIVES_LOADING : return  { ...state, isLoading : true };
        
        default: return state;
    }

}