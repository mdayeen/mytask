import axios from 'axios';

// Use environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = JSON.parse(token).token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance; 