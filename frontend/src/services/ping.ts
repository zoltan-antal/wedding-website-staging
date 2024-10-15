import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/ping`;

async function ping() {
  const response = await axios.get(baseUrl);
  return response.data;
}

export default { ping };
