import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/gifts`;

async function fetchAllGifts() {
  const requestConfig = { withCredentials: true };
  const response = await axios.get(`${baseUrl}/`, requestConfig);
  return response.data;
}

async function claimGift(giftId: number) {
  const requestConfig = { withCredentials: true };
  const response = await axios.patch(
    `${baseUrl}/:${giftId}/claim`,
    requestConfig
  );
  return response.data;
}

async function unclaimGift(giftId: number) {
  const requestConfig = { withCredentials: true };
  const response = await axios.patch(
    `${baseUrl}/:${giftId}/unclaim`,
    requestConfig
  );
  return response.data;
}

export default { fetchAllGifts, claimGift, unclaimGift };
