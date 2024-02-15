import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from './resources/theme';
import { store } from './redux/configureStore';
import Main from './components/MainComponent';
import CssBaseline from '@mui/material/CssBaseline';


const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Main />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
