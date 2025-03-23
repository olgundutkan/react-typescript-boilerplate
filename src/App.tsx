import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import store from '@store';
import AppRouter from './router';

/**
 * Application-wide theme configuration.
 */
const theme = createTheme({});

/**
 * The root component of the application.
 * Wraps the entire app with Redux and Material UI theme providers.
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
