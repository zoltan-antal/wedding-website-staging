import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import guestService from '../services/guestService';
import { GuestAttributes } from '../models/guests';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
  RequireAccommodation = 'requireAccommodation',
  AccommodationPreference = 'accommodationPreference',
  WillingToShareTent = 'willingToShareTent',
  RequireTransport = 'requireTransport',
  DietaryRequirements = 'dietaryRequirements',
  InterestedInMeetAndGreet = 'interestedInMeetAndGreet',
  InterestedInPostWeddingWindDown = 'interestedInPostWeddingWindDown',
  Comments = 'comments',
}

interface RsvpFormData {
  [RsvpFormFieldNames.GuestsAttending]: { [key: number]: boolean | undefined };
  [RsvpFormFieldNames.RequireAccommodation]?: boolean;
  [RsvpFormFieldNames.AccommodationPreference]?:
    | 'tent'
    | 'hotel'
    | 'no preference';
  [RsvpFormFieldNames.WillingToShareTent]?: boolean;
  [RsvpFormFieldNames.RequireTransport]?: boolean;
  [RsvpFormFieldNames.DietaryRequirements]: string;
  [RsvpFormFieldNames.InterestedInMeetAndGreet]?: boolean;
  [RsvpFormFieldNames.InterestedInPostWeddingWindDown]?: boolean;
  [RsvpFormFieldNames.Comments]: string;
}

interface RsvpSubmissionRequest extends Request {
  body: RsvpFormData;
}

const submitRsvp = async (req: RsvpSubmissionRequest, res: Response) => {
  const formData = req.body;
  const guest = req.user as GuestAttributes;
  const dateTime = new Date();

  const guestsAttending = await Promise.all(
    Object.entries(formData.guestsAttending).map(
      async ([guestId, isComing]) => {
        const guest = await guestService.getGuest(Number(guestId));
        return `${guest?.firstName}:${isComing}`;
      }
    )
  );
  const guestsAttendingJoined = guestsAttending.join(',');
  const csvLine = `"${guest.lastName},${
    guest.firstName
  }",${dateTime.toISOString()},"${guestsAttendingJoined}",${
    formData.requireAccommodation
  },${formData.accommodationPreference},${formData.willingToShareTent},${
    formData.requireTransport
  },${formData.dietaryRequirements},${formData.interestedInMeetAndGreet},${
    formData.interestedInPostWeddingWindDown
  },${formData.comments}`;

  const dataDirectoryPath = path.join(__dirname, '../..', 'data');
  const csvFilePath = path.join(__dirname, '../..', 'data', 'rsvpData.csv');
  if (!fs.existsSync(dataDirectoryPath)) {
    fs.mkdirSync(dataDirectoryPath);
  }
  if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(
      csvFilePath,
      `submittedBy,submittedAt,${RsvpFormFieldNames.GuestsAttending},${RsvpFormFieldNames.RequireAccommodation},${RsvpFormFieldNames.AccommodationPreference},${RsvpFormFieldNames.WillingToShareTent},${RsvpFormFieldNames.RequireTransport},${RsvpFormFieldNames.DietaryRequirements},${RsvpFormFieldNames.InterestedInMeetAndGreet},${RsvpFormFieldNames.InterestedInPostWeddingWindDown},${RsvpFormFieldNames.Comments}\n`
    );
  }
  fs.appendFileSync(csvFilePath, `${csvLine}\n`, 'utf8');

  res.send(200);
};

export default {
  submitRsvp,
};
