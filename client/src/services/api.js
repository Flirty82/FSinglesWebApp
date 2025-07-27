import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.flirtingsingles.blog/api',
});

export default api;