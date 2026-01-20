import axios from 'axios';

const getBaseURL = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  return base.endsWith('/api') ? base : `${base}/api`;
};

const apiInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request
apiInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors (like 401 Unauthorized)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - potential invalid token');
      // Optional: Redirect to login or clear local storage
      // localStorage.removeItem('token');
      // localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
