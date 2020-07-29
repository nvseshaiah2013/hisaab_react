import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { routes } from '../resources/private.navbar';
import { List, ListItem, ListItemText, Hidden, Drawer, Divider, Typography, ListItemIcon, Button } from '@material-ui/core';
import SettingsPowerSharpIcon from '@material-ui/icons/SettingsPowerSharp';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/ActionCreators';

const drawerWidth = '20vw';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper1: {
        [theme.breakpoints.down('sm')] : {
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
                <Hidden xsDown implementation="css">
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