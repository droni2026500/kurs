import axios from 'axios';

const authorization = (userName, password) => axios.post('/api/authorization', { userName, password });
const registration = (userName, password) => axios.post('/api/registration', { userName, password });

export const auth = { authorization, registration };
