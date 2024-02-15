import React from 'react';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MonetizationOnSharpIcon from '@mui/icons-material/MonetizationOnSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import LockIcon from '@mui/icons-material/Lock';
import GiveForm from '../components/GiveFormComponent';

const Takes = React.lazy(() => import('../components/TakesComponent'));
const Gives = React.lazy(()=> import('../components/GivesComponent'));
const Reminders = React.lazy(() => import('../components/ReminderComponent'));
const ChangePassword = React.lazy(() => import('../components/ChangePasswordComponent'));
const NotFound = React.lazy(() => import('../components/NotFoundComponent'));

export const routes = [
    {
        key : 100,
        url : '',
        name : 'Dashboard',
        component : GiveForm,
        type : '',
        show : true,
        icon : <DashboardRoundedIcon />
    },
    {
        key : 101,
        url : '/given-money/',
        name : 'Given Money',
        component : Gives,
        type : 'Money',
        show : true,
        icon : <MonetizationOnSharpIcon />
    },    
    {
        key : 102,
        url : '/given-items/',
        name : 'Given Items',
        component : Gives,
        type : 'Items',
        show : true,
        icon : <StorageSharpIcon />
    },
    {
        key : 103,
        url : '/taken-money/',
        name : 'Money Taken',
        component : Takes,
        type : 'Money',
        show : true,
        icon : <MonetizationOnSharpIcon />
    },
    {
        key : 104,
        url : '/taken-items/',
        name : 'Items Taken',
        component : Takes,
        type : 'Items',
        show : true,
        icon : <StorageSharpIcon />
    },
    {
        key : 105,
        url : '/reminders/',
        name : 'Reminders' ,
        component : Reminders,
        type : '',
        show : true,
        icon : <NotificationsSharpIcon/>
    },
    {
        key : 108,
        url : '/change-password',
        name : 'Change Password',
        component : ChangePassword,
        type : '',
        show : true ,
        icon : <LockIcon />
    },
    {
        key : 106,
        url : '/*',
        name : 'Not Found',
        component : NotFound,
        type : '',
        show : false
    },
];