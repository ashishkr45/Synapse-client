import { api } from './api';

export const signupUser = async (data: { email: string; password: string; username: string }) => {
  return api.post('/signup', {
    email: data.email,
    password: data.password,
    username: data.username,
  });
};

export const loginUser = async (data: { email: string; password: string }) => {
  return api.post('/signin', {
    email: data.email,
    password: data.password,
  });
};
