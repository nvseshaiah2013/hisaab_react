import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { routes } from '../resources/public.navbar';
import { useSelector } from 'react-redux';

const Main = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated );
    const views = routes.map((route,index) => {
        if(route.protected)
            return (
                <Route exact path={route.url} key={index} component={ () => isAuthenticated ? route.component : <Redirect to='/login' />}/>
            );
        else
            return (
                <Route exact path={route.url} key={index} component={() => route.component} />
            );
    });
    return (
        <Switch>
            {views}
        </Switch>
    );
}

export default withRouter(Main);