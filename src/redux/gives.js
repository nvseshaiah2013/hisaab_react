import { SELECT_FRIEND, DESELET_FRIEND } from './ActionTypes';

export const Gives = (state = {
    selectedFriend: null,
    givenMoney: [],
    givenItems: [],
    isLoading: false,
    givenItem: null,
    givenAmount: null
}, action) => {
    switch (action.type) {
        case SELECT_FRIEND : return { ...state, selectedFriend : action.payload };
        case DESELET_FRIEND : return { ...state, selectedFriend : null };
        default: return state;
    }

}