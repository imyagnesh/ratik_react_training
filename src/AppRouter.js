import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import PageRouter from './components/PageRouter';

const AppRouter = () => (
  <Router>
    <PageRouter routes={routes} />
  </Router>
);

export default AppRouter;
