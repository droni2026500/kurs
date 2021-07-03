import axios from 'axios';

const createEvent = (values) => axios.post('/api/createEvent', values);

export const events = { createEvent };
