import React, { FunctionComponent } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { routes } from './routes';

export const Router: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to={routes.repositories}>Repositories</Link>
          </li>
          <li>
            <Link to={routes.pullRequests}>Pull requests</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path={routes.pullRequests}>Pull requests</Route>
        <Route path={routes.repositories}>Repositories</Route>
      </Switch>
    </BrowserRouter>
  );
};
