import axios from 'axios';

const API = axios.create({ baseURL: 'https://www.flirtingsingles.blog/api', });

export const registerUser = (data) => API.post('/auth/register', data);