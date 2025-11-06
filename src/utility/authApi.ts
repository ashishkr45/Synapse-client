import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const signupUser = async (data: { email: string; password: string; username: string }) => {
  return axios.post(`${API_BASE}/signup`, {
    email: data.email,
    password: data.password,
    username: data.username,
  });
};

/*Sample User
* email: mature@Ladykiller@gmail.com
* username: matureLady
* password: matureLady234
*/

export const loginUser = async (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE}/signin`, {
    email: data.email,
    password: data.password,
  });
};
