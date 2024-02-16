import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { routes } from '../resources/public.navbar';
import { useSelector } from 'react-redux';
import { withRouter } from './withRouter';

const Main = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated );
    const views = routes.map((route,index) => {
        if(route.protected)
            return (
                <Route path={route.url} key={index} element={ isAuthenticated ? <route.component /> : <Navigate to='/login' />} />
            );
        else
            return (
                <Route exact path={route.url} key={index} element={<route.component />} />
            );
    });
    return (
        <Routes>
            {views}
        </Routes>
    );
}

export default withRouter(Main);