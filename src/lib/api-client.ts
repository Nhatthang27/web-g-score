import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const privateClient = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export const publicClient = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});