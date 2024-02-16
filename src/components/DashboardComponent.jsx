import React, { Suspense } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {makeStyles } from '@mui/styles';
import Navbar from './NavbarComponent';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../resources/private.navbar';
import { Routes, Route } from 'react-router-dom';
import Loading from './LoadingComponent';
import SocialButtons from './SocialComponent';

const useStyles = makeStyles((theme) => ({

    content: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '15vw'
        }
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
        marginTop: -theme.spacing(3),
        backgroundColor: theme.palette.info.dark,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    white: {
        color: 'white',
        alignItems: 'baseline'
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClose = () => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    }
    return (
        <Container maxWidth="lg">
             <Box zIndex={2000} position={'fixed'} right={'0'} top={'200px'}>                
                    <SocialButtons />                
            </Box>
            <Box className={classes.appBar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                    size="large">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" className={classes.white} display="inline">Hisaab Kitaab</Typography>
            </Box>
            <div>
                <Navbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} handleClose={handleClose} />
                <div className={classes.content}>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            {routes.map((route) => {
                                return (
                                    <Route exact path={`${route.url}`} element={<route.component type={route.type} />} key={route.key + 100} />
                                );
                            })}
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;