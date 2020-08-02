import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { theme } from './resources/theme';
import { store } from './redux/configureStore';
import Main from './components/MainComponent';
import CssBaseline from '@material-ui/core/CssBaseline';


const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
