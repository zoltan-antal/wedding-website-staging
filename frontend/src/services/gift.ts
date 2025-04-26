import axios from 'axios';
import config from '../utils/config';
import { Gift } from '../types/gift';

const baseUrl = `${config.BACKEND_URL}/gifts`;

async function fetchAllGifts(): Promise<Gift[]> {
  const requestConfig = { withCredentials: true };
  const response = await axios.get(`${baseUrl}/`, requestConfig);
  return response.data as Gift[];
}

async function claimGift(giftId: number) {
  const requestConfig = { withCredentials: true };
  const response = await axios.patch(
    `${baseUrl}/${giftId}/claim`,
    null,
    requestConfig
  );
  return response.data as Gift;
}

async function unclaimGift(giftId: number) {
  const requestConfig = { withCredentials: true };
  const response = await axios.patch(
    `${baseUrl}/${giftId}/unclaim`,
    null,
    requestConfig
  );
  return response.data as Gift;
}

export default { fetchAllGifts, claimGift, unclaimGift };
