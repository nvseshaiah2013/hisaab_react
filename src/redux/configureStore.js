import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import { Gives } from './gives';
import { Takes } from './takes';
import { Reminders } from './reminders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Token } from './token';

const appReducer = combineReducers({
    auth: Auth,
    signup: Signup,
    gives: Gives,
    takes: Takes,
    reminders: Reminders,
    token: Token
});

export const ConfigureStore = () => {
    const store = createStore(appReducer,applyMiddleware(thunk, logger));
    return store;
}