import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import PageRouter from './components/PageRouter';
import LocaleProvider from './context/localeContex';

const AppRouter = () => (
  <Router>
    <LocaleProvider>
      <PageRouter routes={routes} />
    </LocaleProvider>
  </Router>
);

export default AppRouter;
