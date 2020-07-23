import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Login from './LoginComponent';
import SignUp from './SignupComponent';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='*' component={Home} />
        </Switch>
    );
}

export default withRouter(Main);