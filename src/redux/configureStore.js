import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import { Gives } from './gives';
import { Takes } from './takes';
import { Reminders } from './reminders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Token } from './token';
import { LOGOUT } from './ActionTypes';

const appReducer = combineReducers({
    auth: Auth,
    signup: Signup,
    gives: Gives,
    takes: Takes,
    reminders: Reminders,
    token: Token
});

const rootReducer = (state, action) => {
    if(action.type === LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
}

export const store = createStore(rootReducer,applyMiddleware(thunk,logger));