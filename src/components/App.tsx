import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Room from './Room';
import NotFound from './NotFound';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/room/:roomId" component={Room} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
