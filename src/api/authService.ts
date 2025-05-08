// src/api/authService.ts
import axiosInstance from './axiosInstance';

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post('/AdminAccount/Login', {
    UserName: username,
    Password: password,
  });
  return response.data;
};

export const refreshToken = async (accessToken: string, refreshToken: string) => {
  const response = await axiosInstance.post('/Account/RefreshToken', {
    AccessToken: accessToken,
    RefreshToken: refreshToken,
  });
  return response.data;
};