import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Login from './Login';
import Room from './Room';
import NotFound from './NotFound';
import background from '../shared/images/city.jpg';

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
  background-image: url(${background});
  background-size: cover;
  overflow: auto;
`;

export default function App(): JSX.Element {
  return (
    <MainWrapper>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/room/:roomId" component={Room} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <NotificationContainer />
    </MainWrapper>
  );
}
