import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/LoginComponent';
import SignUp from './components/SignupComponent';
import Home from './components/HomeComponent';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './resources/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/signup' component={SignUp} />
              <Route path='*' component={Home} />
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
