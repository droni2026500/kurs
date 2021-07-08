import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { auth } from '../../api/authorization';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
}));

const Registration = () => {
  const history = useHistory();
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [responseError, setResponseError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validation = () => {
    const errorFields = {};
    if (userName === '') {
      errorFields.userName = 'Обязательное поле';
    }
    if (password === '') {
      errorFields.password = 'Обязательное поле';
    }
    setErrors(errorFields);

    return Object.keys(errorFields).length === 0;
  };

  const handleSubmit = async () => {
    try {
      const isValid = validation();
      if (isValid) {
        setIsSubmitting(true);
        await auth.registration(userName, password);
        setIsSubmitting(false);
        history.push('/');
      }
    } catch {
      setIsSubmitting(false);
      setResponseError('Такой пользователь уже существует');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setUserName(e.target.value)}
          disabled={isSubmitting}
          error={errors && !!errors.userName}
          helperText={errors.userName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          error={errors && !!errors.password}
          helperText={errors.password}
        />
        <p className={classes.error}>{responseError}</p>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Регистрация
        </Button>
      </div>
    </Container>
  );
};
export default Registration;
