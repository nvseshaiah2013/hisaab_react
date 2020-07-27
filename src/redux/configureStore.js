import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Signup } from './signup';
import { Gives } from './gives';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers(
            {
                auth : Auth,
                signup : Signup,
                gives : Gives
            }
        ),
       applyMiddleware(thunk,logger)      
    );
    return store;
}