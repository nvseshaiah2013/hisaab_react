import React from "react";
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '2rem',
  },
  container : {
    color : 'white',
    backgroundColor : '#556B2F'
  },
  button: {
    flexGrow: 1,
    padding: '1rem',
    marginTop: '-12px',
    textDecoration: 'none',
    color: 'white',
    transition: '0.5s',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.2)',
      transform: 'translateY(-1px)'
    },
    borderRadius: '3px'
  },
  height : {
    minHeight : '100vh'
  }
}));


const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Box className={clsx(classes.backgroundImage,classes.height)}>
        <Box className={classes.root}>
          <Box marginRight={'auto'}>
            <Typography variant="h5">
              Hisaab Kitaab
            </Typography>
          </Box>
          <Box marginLeft={'auto'} display={'flex'} justifyContent={'space-evenly'} style={{ transition: '0.5s' }}>
            <Link to='/login' className={classes.button}>
              <Typography variant="body1">
                Login
            </Typography>
            </Link>
            <Link to='/signup' className={classes.button}>
              <Typography variant="body1">
                Register
          </Typography>
            </Link>
          </Box>
        </Box>
        <Box marginTop={15}>
          <Typography variant="h3" display="block" align="center" > Welcome to Hisaab Kitaab </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.height)}>
          <Typography variant="h5" display="block" align="center"> About Hisaab Kitaab </Typography>
      </Box>
    </Container>
  );
}

export default Home;