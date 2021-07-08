import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MomentUtils from '@date-io/moment';
import ImageUploader from 'react-images-upload';
import { useHistory } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { eventsMethod } from '../../api/events';

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
  responseError: {
    color: '#f44336',
    fontSize: '14px',
  },
  imageError: {
    fontSize: '14px',
    marginLeft: '14px',
    marginRight: '14px',
    color: '#f44336',
    width: '100%',
  },
}));

const CreateEvent = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState('');
  const [initialState, setInitialState] = useState({
    title: '',
    description: '',
    dateEvent: null,
    location: '',
    subway: '',
    image: '',
  });

  const validation = () => {
    const errorFields = {};
    if (initialState.title === '') {
      errorFields.title = 'Обязательное поле';
    }
    if (initialState.description === '') {
      errorFields.description = 'Обязательное поле';
    }
    if (initialState.dateEvent === null) {
      errorFields.dateEvent = 'Обязательное поле';
    }
    if (initialState.location === '') {
      errorFields.location = 'Обязательное поле';
    }
    if (initialState.subway === '') {
      errorFields.subway = 'Обязательное поле';
    }
    if (initialState.image === '') {
      errorFields.image = 'Загрузите изображение';
    }
    setErrors(errorFields);

    return Object.keys(errorFields).length === 0;
  };
  const handleSubmit = async () => {
    try {
      const isValid = validation();
      if (isValid) {
        setIsSubmitting(true);
        await eventsMethod.createEvent(initialState);
        setIsSubmitting(false);
        history.push('/events');
      }
    } catch {
      setIsSubmitting(false);
      setResponseError('Не удалось создать событие');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Создать мероприятие
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          value={initialState.title}
          label="Название мероприятия"
          name="title"
          autoFocus
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors && !!errors.title}
          helperText={errors.title}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={initialState.description}
          id="description"
          label="Описание"
          name="description"
          autoFocus
          multiline
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors && !!errors.description}
          helperText={errors.description}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="location"
          value={initialState.location}
          label="Место проведения"
          name="location"
          autoFocus
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors && !!errors.location}
          helperText={errors.location}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="subway"
          value={initialState.subway}
          label="Метро"
          required
          name="subway"
          autoFocus
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors && !!errors.subway}
          helperText={errors.subway}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
            required
            margin="normal"
            fullWidth
            name="date"
            id="dateEvent"
            label="Дата проведения"
            value={initialState.dateEvent}
            onChange={(value) => {
              setInitialState((prevState) => ({
                ...prevState,
                dateEvent: value,
              }));
            }}
            disabled={isSubmitting}
            error={errors && !!errors.dateEvent}
            helperText={errors.dateEvent}
          />
        </MuiPickersUtilsProvider>
        <ImageUploader
          withIcon
          buttonText="Загрузить изображение"
          onChange={(value) => {
            const reader = new FileReader();
            reader.readAsDataURL(value[0]);
            reader.onload = () => {
              setInitialState((prevState) => ({
                ...prevState,
                image: reader.result,
              }));
            };
          }}
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
          singleImage
          disabled={isSubmitting}
        />
        <p className={classes.imageError}>{errors.image}</p>
        <p className={classes.responseError}>{responseError}</p>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Создать мероприятие
        </Button>
      </div>
    </Container>
  );
};
export default CreateEvent;
