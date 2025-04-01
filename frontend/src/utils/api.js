
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Your Django server address
  withCredentials: true // Important for session cookies
});

export default API;