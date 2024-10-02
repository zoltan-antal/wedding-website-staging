import axios from 'axios';
import config from '../utils/config';
import { RsvpFormData, RsvpSubmission } from '../types/rsvp';
import { Language } from '../types/language';

const baseUrl = `${config.BACKEND_URL}/rsvp`;

interface SubmitRsvpResponseBody {
  rsvps: RsvpSubmission[];
}

async function submitRsvp(
  formData: RsvpFormData,
  emailCopy: boolean,
  language: Language
) {
  const requestConfig = { withCredentials: true };
  const response = await axios.post(
    `${baseUrl}`,
    { formData, emailCopy, language },
    requestConfig
  );
  return response.data as SubmitRsvpResponseBody;
}

export default { submitRsvp };
