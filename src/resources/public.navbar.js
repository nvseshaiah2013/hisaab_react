import Login from '../components/LoginComponent';
import SignUp from '../components/SignupComponent';
import Home from '../components/HomeComponent';
import Dashboard from '../components/DashboardComponent';
import ForgotPassword from '../components/ForgotPassword';
import NotFound from '../components/NotFoundComponent';

export const routes = [
    {
        url : '/login',
        component : Login,
        protected : false
    },
    {
        url : '/signup',
        component : SignUp,
        protected : false
    },
    {
        url : '/',
        component : Home,
        protected : false
    },
    {
        url : '/dashboard',
        component : Dashboard,
        protected : true
    },
    {
        url : '/forgot-password',
        component : ForgotPassword,
        protected : false
    },
    {
        url : '*',
        component : NotFound ,
        protected : false
    }
];
