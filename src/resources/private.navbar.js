import React,{lazy} from 'react';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import MonetizationOnSharpIcon from '@material-ui/icons/MonetizationOnSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import StorageSharpIcon from '@material-ui/icons/StorageSharp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';

const Takes = lazy(() => import('../components/TakesComponent'));
const GiveForm = lazy(() => import('../components/GiveFormComponent'));
const About = lazy(() => import('../components/AboutComponent'));
const Gives = lazy(()=> import('../components/GivesComponent'));
const Reminders = lazy(() => import('../components/ReminderComponent'));

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
        key : 107,
        url : '/about/',
        name : 'About Project',
        component : About,
        type : '',
        show : true,
        icon : <InfoSharpIcon />
    },
    {
        key : 106,
        url : '/*',
        name : 'Not Found',
        component : GiveForm,
        type : '',
        show : false
    },
];