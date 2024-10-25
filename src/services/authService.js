import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from './tokenService';

const api = axios.create({
  baseURL: 'https://temptesttask.pulseintelligence.com/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error),
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
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            'https://temptesttask.pulseintelligence.com/api/v1/auth/token/refresh/',
            { refresh: refreshToken },
          );
          setAccessToken(data.access);
          originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
          return api(originalRequest);
        } catch (refreshError) {
          removeAccessToken();
          removeRefreshToken();
          window.location.href = '/';
        }
      } else {
        removeAccessToken();
        removeRefreshToken();
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
