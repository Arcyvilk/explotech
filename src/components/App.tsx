import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Room from './Room';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><Login /></Route>
        <Route exact path='/room'><Room /></Route>
      </Switch>
    </Router>
  );
}
