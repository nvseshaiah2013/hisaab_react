import { SELECT_FRIEND, DESELET_FRIEND, GIVE_MONEY, GIVE_ERROR } from './ActionTypes';

export const Gives = (state = {
    selectedFriend: null,
    givenMoney: [],
    givenItems: [],
    isLoading: false,
    givenItem: null,
    givenAmount: null,
    errMess : null
}, action) => {
    switch (action.type) {
        case SELECT_FRIEND : return { ...state, selectedFriend : action.payload };
        case DESELET_FRIEND : return { ...state, selectedFriend : null };
        case GIVE_MONEY : return { ...state, givenAmount : action.payload };
        case GIVE_ERROR : return { ...state, errMess : action.payload };
        default: return state;
    }

}