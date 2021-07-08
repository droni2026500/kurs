import axios from 'axios';

const createEvent = (values) => axios.post('/api/createEvent', values);
const getEvents = () => axios.get('/api/getEvents');

export const eventsMethod = { createEvent, getEvents };
