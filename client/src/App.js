import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/MainPage/MainPage';
import './App.css';
import Registration from './components/Registration/Registration';
import CreateEvent from './components/CreateEvent/CreateEvent';

const useStyles = makeStyles({

  body: {
    margin: 0,
    body: 0,
  },

  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
  },
});

const navLinks = [
  { title: 'Главная', path: '/main' },
  { title: 'Авторизация', path: '/login' },
  { title: 'Регистрация', path: '/registration' },
  { title: 'Создать мероприятие', path: '/createEvent' },
];

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ title, path }) => (
                  <Link to={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Container>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/main" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={Registration} />
          <Route path="/createEvent" component={CreateEvent} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
