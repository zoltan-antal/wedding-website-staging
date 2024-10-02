import axios from 'axios';
import config from '../utils/config';
import { RsvpFormData } from '../types/rsvp';
import { Language } from '../types/language';

const baseUrl = `${config.BACKEND_URL}/rsvp`;

async function submitRsvp(
  rsvpData: RsvpFormData,
  emailCopy: boolean,
  language: Language
) {
  const requestConfig = { withCredentials: true };
  const response = await axios.post(
    `${baseUrl}`,
    { rsvpData, emailCopy, language },
    requestConfig
  );
  return response.data;
}

export default { submitRsvp };
