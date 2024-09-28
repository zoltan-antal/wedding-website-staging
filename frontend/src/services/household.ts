import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/households`;

async function me() {
  const requestConfig = { withCredentials: true };
  const response = await axios.get(`${baseUrl}/me`, requestConfig);
  return response.data;
}

export default { me };
