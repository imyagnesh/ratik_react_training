import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import NoMatch from '../../pages/NoMatch';

const index = ({ routes }) => (
  <div>
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <Switch>
      {routes.map(
        ({ routes, component: Component, ...rest }) => (
          <Route
            key={rest.path}
            {...rest}
            render={(props) => {
              return (
                <Component routes={routes} {...props} />
              );
            }}
          />
        ),
      )}
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default index;
