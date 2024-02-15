import React from "react";
import Container from '@mui/material/Container';
import {makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: '2rem'
  },
  container: {
    color: '#0048ba',
    backgroundColor: '#f0f8ff'
  },
  button: {
    flexGrow: 1,
    padding: '1rem',
    marginTop: '-12px',
    textDecoration: 'none',
    color: '0048ba',
    transition: '0.5s',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.2)',
      transform: 'translateY(-1px)'
    },
    borderRadius: '3px'
  },
  height: {
    minHeight: '100vh'
  },
  imageBox: {
    justifyContent: 'center',
    marginTop: '3rem',
    flexDirection: "column",
    alignItems: 'center'
  },
  margin_2: {
    margin: '2rem'
  },
  margin_1: {
    margin: '1rem'
  }
}));


const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Box className={clsx(classes.backgroundImage, classes.height)}>
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
        <Box marginTop={10}>
          <Typography variant="h4" display="block" align="center" > Your personal ledger to track your borrowings </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.height)}>
        <Typography variant="h5" display="block" align="center"> Keep Track of your Money </Typography>
        <Box className={clsx(classes.root, classes.imageBox)}>
          <img src="assets/images/bg2.png" width={"512px"} alt={'Money'} />
          <Typography variant="h6" className={clsx(classes.margin_2)}> As soon as you give money to your friend create a record in the App. </Typography>
          <Typography variant="subtitle1" className={clsx(classes.margin_1)}>  Verify the transaction through a Secret Token shared sent to your friend and its that simple.
          </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.height)}>
        <Typography variant="h5" display="block" align="center"> Keep Track of your Items </Typography>
        <Box className={clsx(classes.root, classes.imageBox)}>
          <img src="assets/images/bg1.png" height={"360px"} alt={'Item'} />
          <Typography variant="h6" className={clsx(classes.margin_1)}> As soon as you give some of your things to your friend create a record in the App. </Typography>
          <Typography variant="subtitle1" className={clsx(classes.margin_1)}>  Verify the transaction through a Secret Token shared sent to your friend and its that simple.
          </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.height)}>
        <Typography variant="h5" display="block" align="center"> Easy Reminders to Return Your Belongings </Typography>
        <Box className={clsx(classes.root, classes.imageBox)}>
          <img src="assets/images/bg3.png" height={"360px"} alt={'Reminder'} />
          <Typography variant="h6" className={clsx(classes.margin_1)}> One click reminder to return back your belongings. </Typography>
          <Typography variant="subtitle1" className={clsx(classes.margin_1)}>  Easy tracking of reminders sent for a particular belonging.
          </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.height)}>
        <Typography variant="h5" display="block" align="center"> Stop Habit of Give And Forget </Typography>
        <Box className={clsx(classes.root, classes.imageBox)}>
          <img src="assets/images/bg4.png" height={"360px"} alt={'Give And Forget'} />
          <Typography variant="h6" className={clsx(classes.margin_1)}> Stop the loop of borrowing your belongins and forgetting and then searching </Typography>
          <Typography variant="subtitle1" className={clsx(classes.margin_1)}>  Use Hisaab Kitaab to have a clear picture where your loved belongings went missing !!! :)
          </Typography>
          <Link to='/signup' className={classes.button}>
              <Typography variant="body1">
                Register Now
              </Typography>
            </Link>
        </Box>
      </Box>
      <Box><a target="_blank" href="https://icons8.com/icon/89963/ledger" rel="noopener noreferrer">Ledger</a> icon by <a target="_blank" href="https://icons8.com" rel="noopener noreferrer">Icons8</a></Box>
    </Container>
  );
}

export default Home;