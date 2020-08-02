import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { routes } from '../resources/public.navbar';
import { useSelector } from 'react-redux';

const Main = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated );
    const views = routes.map((route,index) => {
        if(route.protected)
            return (
                <Route path={route.url} key={index} render={ (props) => isAuthenticated ? <route.component {...props} /> : <Redirect to='/login' />} />
            );
        else
            return (
                <Route exact path={route.url} key={index} render={(props) => <route.component {...props}/>} />
            );
    });
    return (
        <Switch>
            {views}
        </Switch>
    );
}

export default withRouter(Main);