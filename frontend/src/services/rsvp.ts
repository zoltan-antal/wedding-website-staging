import axios from 'axios';
import config from '../utils/config';
import { RsvpFormData } from '../types/rsvp';

const baseUrl = `${config.BACKEND_URL}/rsvp`;

async function submitRsvp(rsvpData: RsvpFormData, emailCopy: boolean) {
  const requestConfig = { withCredentials: true };
  const response = await axios.post(
    `${baseUrl}`,
    { rsvpData, emailCopy },
    requestConfig
  );
  return response.data;
}

export default { submitRsvp };
