import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import SettingsPowerSharpIcon from '@mui/icons-material/SettingsPowerSharp';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/ActionCreators';
import { routes } from '../resources/private.navbar';

const drawerWidth = '20vw';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper1: {
        [theme.breakpoints.down('xl')] : {
            width : '50vw'
        },
        width : 0
    },
    drawerPaper2 : {
        [theme.breakpoints.up('md')] : {
            width : drawerWidth
        },
        width : 0
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    header: {
        textAlign: 'center',
        fontWeight: '900',
    },
    hover: {
        '& :hover': {
            backgroundColor: theme.palette.info.light,
        }
    },
    paddingUpDown: {
        padding: '0.2rem 0.3rem'
    },
    link: {
        color: theme.palette.grey[900],
        '&:hover': {
            textDecoration: 'none',
        }

    }
}));

const Navbar = ({ mobileOpen, handleDrawerToggle, handleClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const drawer = routes.filter(route => route.show === true).map((route) => {
        return (
            <Link to={`/dashboard${route.url}`} key={route.key} className={classes.link} onClick={handleClose}>
                <ListItem>
                    <ListItemIcon>{route.icon ? route.icon : ''}</ListItemIcon>
                    <ListItemText primary={route.name} />
                </ListItem>
            </Link>
        );
    });
    return (
        <nav>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper1,
                    }}
                    ModalProps={{
                        keepMounted: false,
                    }}
                >
                    <List>
                        <ListItem key={991}>
                            <Typography variant="h5" className={classes.header} align="center">Hisaab Kitaab</Typography>
                        </ListItem>
                        <Drawer />
                        {drawer}
                        <ListItem key={1101}>
                            <Button onClick={() => dispatch(logout())}>
                                <ListItemIcon>
                                    <SettingsPowerSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Sign Out'} />
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
            <Hidden lgDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper2,
                    }}
                    variant="permanent"
                    open
                >
                    <List className={classes.hover}>
                        <ListItem key={99}>
                            <Typography variant="h5" align="right" className={classes.header}> Hisaab Kitaab </Typography>
                        </ListItem>
                        <Divider />
                        {drawer}              
                        <ListItem key={110}>
                            <Button onClick={() => dispatch(logout())}>
                                <ListItemIcon>
                                    <SettingsPowerSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Sign Out'} />
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default Navbar;