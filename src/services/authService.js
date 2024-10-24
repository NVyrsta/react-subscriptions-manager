import axios from 'axios';

const api = axios.create({
  baseURL: 'https://temptesttask.pulseintelligence.com/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const { data } = await axios.post(
            'https://temptesttask.pulseintelligence.com/api/v1/auth/token/refresh/',
            { refresh: refreshToken },
          );

          localStorage.setItem('access_token', data.access);
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return api(originalRequest);
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
