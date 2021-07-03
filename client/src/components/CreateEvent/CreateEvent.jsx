import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MomentUtils from '@date-io/moment';
import ImageUploader from 'react-images-upload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { events } from '../../api/events';

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
}));

const CreateEvent = () => {
  const classes = useStyles();
  const [initialState, setInitialState] = useState({
    title: '',
    description: '',
    dateEvent: null,
    location: '',
    subway: '',
    image: '',
  });
  const handleSubmit = async () => {
    await events.createEvent(initialState);
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
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={initialState.description}
          id="description"
          label="Описание"
          name="description"
          autoFocus
          multiline
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="location"
          value={initialState.location}
          label="Место проведения"
          name="location"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="subway"
          value={initialState.subway}
          label="Метро"
          name="subway"
          autoFocus
          onChange={handleChange}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD.MM.YYYY"
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Создать мероприятие
        </Button>
      </div>
    </Container>
  );
};
export default CreateEvent;
