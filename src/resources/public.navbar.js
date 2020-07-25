import React from 'react';
import Login from '../components/LoginComponent';
import SignUp from '../components/SignupComponent';
import Home from '../components/HomeComponent';
import Dashboard from '../components/DashboardComponent';
import ForgotPassword from '../components/ForgotPassword';

export const routes = [
    {
        url : '/login',
        component : <Login />,
        protected : false
    },
    {
        url : '/signup',
        component : <SignUp />,
        protected : false
    },
    {
        url : '/',
        component : <Home />,
        protected : false
    },
    {
        url : '/dashboard',
        component : <Dashboard />,
        protected : true
    },
    {
        url : '/forgot-password',
        component : <ForgotPassword />,
        protected : false
    }
];
