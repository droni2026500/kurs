import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import Events from './components/Events/Events';
import './App.css';
import Registration from './components/Registration/Registration';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Header from './components/Header/Header';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <ProtectedRoute path="/events" component={Events} />
      <Route path="/" exact component={LoginPage} />
      <Route path="/registration" component={Registration} />
      <ProtectedRoute path="/createEvent" component={CreateEvent} />
    </Switch>
  </Router>
);
export default App;
