import React, { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    '&:hover': {
      borderBottom: '2px solid red;',
      marginBottom: '-2px',
    },
  },
  exit: {
    cursor: 'pointer',
    width: '34px',
    height: '34px',
  },
});

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [role, setRole] = useState(true);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setRole(JSON.parse(sessionStorage.getItem('isAdmin')));
    setAuth(JSON.parse(sessionStorage.getItem('isAuthorized')));
  }, [location]);

  const handleExit = () => {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isAuthorized');
    history.push('/');
  };

  const navLinks = [
    {
      title: 'События', path: '/events', authorize: auth, isAdmin: false,
    },
    {
      title: 'Авторизация', path: '/', authorize: !auth, isAdmin: false,
    },
    {
      title: 'Регистрация', path: '/registration', authorize: !auth, isAdmin: false,
    },
    {
      title: 'Создать мероприятие', path: '/createEvent', authorize: auth, isAdmin: !role,
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({
              title, path, authorize, isAdmin,
            }) => (
              <>
                {authorize && !isAdmin && (
                  <Link to={path} key={title} className={classes.linkText}>
                    <ListItem>
                      <ListItemText primary={title} />
                    </ListItem>
                  </Link>
                )}
              </>
            ))}
          </List>
        </Container>
        {auth && <ExitToAppIcon className={classes.exit} onClick={() => handleExit()} />}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
