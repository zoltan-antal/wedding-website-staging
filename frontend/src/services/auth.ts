import axios from 'axios';
import config from '../utils/config';
import { GuestCredentials } from '../types/guest';

const baseUrl = `${config.BACKEND_URL}/auth`;

async function login(credentials: GuestCredentials) {
  const requestConfig = { withCredentials: true };
  const response = await axios.post(
    `${baseUrl}/login`,
    credentials,
    requestConfig
  );
  return response;
}

async function logout() {
  const requestConfig = { withCredentials: true };
  const response = await axios.post(`${baseUrl}/logout`, null, requestConfig);
  return response;
}

export default { login, logout };
