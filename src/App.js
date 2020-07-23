import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { theme } from './resources/theme';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
