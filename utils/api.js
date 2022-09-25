import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.20.9.194:8000',
});

export default api;