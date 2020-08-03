import React from "react";
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  }
}));


const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Box marginRight={'auto'}>
        <Typography variant="h5">
          Hisaab Kitaab
            </Typography>
      </Box>
      <Box marginLeft={'auto'} >
        <Button variant="outlined" style={{ marginRight : '24px'}}>
          Login
        </Button>
        <Button variant="contained" style={{ backgroundColor : '#009'}}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Home;