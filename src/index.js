import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import { ThemeProvider } from './contexts/theme.context';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);