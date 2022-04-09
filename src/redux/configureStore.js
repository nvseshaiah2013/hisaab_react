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
import { config } from '../resources/config'

const NODE_ENV = config.NODE_ENV;

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

const getMiddleware = () => {
    if (NODE_ENV === 'production') {
        return applyMiddleware(thunk);
    }
    return applyMiddleware(thunk, logger);
}

export const store = createStore(rootReducer,getMiddleware());