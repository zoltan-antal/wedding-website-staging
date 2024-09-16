import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/guests`;

async function findGuest(firstName: string, lastName: string) {
  const response = await axios.get(baseUrl, {
    params: { firstName, lastName },
  });
  return response.data;
}

async function me() {
  const requestConfig = { withCredentials: true };
  const response = await axios.get(`${baseUrl}/me`, requestConfig);
  return response.data;
}

async function createPassword(
  firstName: string,
  lastName: string,
  password: string
) {
  const response = await axios.post(`${baseUrl}/password`, {
    firstName,
    lastName,
    password,
  });
  return response;
}

export default { findGuest, me, createPassword };
