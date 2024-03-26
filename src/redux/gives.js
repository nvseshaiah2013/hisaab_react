import { SELECT_FRIEND, 
         DESELET_FRIEND, 
         GIVE_MONEY, 
         GIVE_ERROR, 
         GIVE_ITEM, 
         CLEAR_GIVE_MESSAGE, 
         FETCH_GIVEN_MONEY, 
         FETCH_GIVEN_ITEMS, 
         GIVES_LOADING, 
         UPDATE_GIVE_ITEM, 
         UPDATE_GIVE_MONEY, 
         DELETE_BORROW_ITEM,
         DELETE_BORROW_MONEY} 
from './ActionTypes';

export const Gives = (state = {
    selectedFriend: null,
    givenMoney: [],
    givenItems: [],
    isLoading: false,
    givenItem: null,
    givenAmount: null,
    message: null,
    status: null
}, action) => {
    switch (action.type) {
        case SELECT_FRIEND: return { ...state, selectedFriend: action.payload };

        case DESELET_FRIEND: return { ...state, selectedFriend: null };

        case GIVE_MONEY: return { ...state, givenAmount: action.payload.payload.savedBorrow, status: action.payload.status, message: action.payload.message };

        case FETCH_GIVEN_MONEY: return { ...state, isLoading: false, givenMoney: action.payload.payload.borrows };

        case UPDATE_GIVE_ITEM: return { ...state, 
                                         isLoading : false, 
                                         status : action.payload.status, 
                                         message : action.payload.message, 
                                         givenItems : state.givenItems.map((value) => value._id === action.payload.borrow._id ? {...value,...action.payload.borrow} : value) }

        case UPDATE_GIVE_MONEY: return { ...state, 
                                        isLoading : false, 
                                        status : action.payload.status, 
                                        message : action.payload.message, 
                                        givenMoney : state.givenMoney.map((value) => value._id === action.payload.borrow._id ? {...value,...action.payload.borrow} : value) }

        case DELETE_BORROW_ITEM : return { ...state, 
                                            isLoading : false,
                                            status : action.payload.status,
                                            message : action.payload.message,
                                            givenItems : [...state.givenItems.slice(0,action.payload.index), ...state.givenItems.slice(action.payload.index + 1)]
                                         };

        case DELETE_BORROW_MONEY : return { ...state, 
                                            isLoading : false, 
                                            status : action.payload.status,
                                            message : action.payload.message,
                                            givenMoney : [...state.givenMoney.slice(0,action.payload.index), ...state.givenMoney.slice(action.payload.index + 1)]
                                          };
        
        case GIVE_ITEM: return { ...state, givenItem: (action.payload.payload.savedBorrow || {}), status: action.payload.status, message: action.payload.message };

        case FETCH_GIVEN_ITEMS: return { ...state, givenItems: (action.payload.payload.borrows || []) };

        case GIVE_ERROR: return { ...state, message: action.payload.payload.errorMessage, status: action.payload.status, isLoading: false };

        case CLEAR_GIVE_MESSAGE: return { ...state, status: null, message: null };

        case GIVES_LOADING: return { ...state, isLoading: true };

        default: return state;
    }

}