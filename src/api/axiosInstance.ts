// src/api/axiosInstance.ts
import axios, { type AxiosRequestConfig, AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'https://sugarytestapi.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Attach access token to outgoing requests
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Refresh token mechanism on 401
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post('https://sugarytestapi.azurewebsites.net/Account/RefreshToken', {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
        });

        const data = response.data;

        if (data?.Token && data?.RefreshToken) {
          localStorage.setItem('token', data.Token);
          localStorage.setItem('refreshToken', data.RefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${data.Token}`;
          }

          return instance(originalRequest); // Retry original request
        } else {
          throw new Error('Invalid refresh response');
        }

      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default instance;
