import React from 'react';
import { IconButton, Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './NavbarComponent';
import MenuIcon from '@material-ui/icons/Menu';
import Footer from './FooterComponent';
import { routes } from '../resources/private.navbar';
import { Switch, Route } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    menuButton: {
        color: theme.palette.grey.main,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        width: '100vw',
        marginLeft: -theme.spacing(2),
        backgroundColor: theme.palette.info.dark,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    white: {
        color: 'white',
        alignItems: 'base'
    }
}));

const Dashboard = ({ match }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Container maxWidth="md">
            <Box className={classes.appBar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" className={classes.white} display="inline">Hisaab Kitaab</Typography>
            </Box>
            <div className={classes.root}>
                <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <main className={classes.content}>
                    <Switch>
                        {routes.map((route) => {
                            return (
                                <Route exact path={`${match.path}${route.url}`} render={(props) => <route.component {...props} type={route.type} />} key={route.key + 100} />
                            );
                        })}
                    </Switch>
                </main>
            </div>
            <Footer />
        </Container>
    );
};

export default Dashboard;