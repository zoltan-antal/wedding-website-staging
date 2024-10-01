import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { GuestAttributes } from '../models/guests';
import guestService from '../services/guestService';
import { RESEND_API_KEY } from '../utils/config';

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

  let saveError: Error | null = null;
  let emailError: Error | null = null;

  try {
    let guestsAttendingFlattened;
    try {
      guestsAttendingFlattened = await Promise.all(
        Object.entries(formData.guestsAttending).map(
          async ([guestId, isComing]) => {
            const guest = await guestService.getGuest(Number(guestId));
            return `${guest?.firstName}:${isComing}`;
          }
        )
      );
    } catch (error) {
      guestsAttendingFlattened = Object.entries(formData.guestsAttending).map(
        ([guestId, isComing]) => `${guestId}:${isComing}`
      );
    }

    const guestsAttendingFlattenedJoined = guestsAttendingFlattened.join(',');
    const csvLine = `"${guest.lastName},${
      guest.firstName
    }",${dateTime.toISOString()},"${guestsAttendingFlattenedJoined}",${
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
  } catch (error) {
    console.error(error);
    saveError = error as Error;
  }

  try {
    const formDataBeautified = JSON.stringify(
      {
        submittedBy: `${guest.lastName},${guest.firstName}`,
        submittedAt: dateTime.toLocaleString(),
        ...formData,
      },
      null,
      4
    );
    const emailBody = `<pre>${formDataBeautified}</pre>`;

    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@auto.ellazoltan.com',
      to: 'info@ellazoltan.com',
      subject: `RSVP form submitted by ${guest.lastName}, ${guest.firstName}`,
      html: emailBody,
    });
  } catch (error) {
    console.error(error);
    emailError = error as Error;
  }

  if (!saveError && !emailError) {
    return res
      .status(200)
      .json({ message: 'Successfully saved & backup emailed RSVP form data' });
  } else if (saveError && !emailError) {
    return res.status(200).json({
      message: 'Successfully backup emailed RSVP form data, but saving failed',
      error: saveError.message,
    });
  } else if (emailError && !saveError) {
    return res.status(200).json({
      message: 'Successfully saved RSVP form data, but backup emailing failed',
      error: emailError.message,
    });
  } else {
    return res.status(500).json({
      message: 'Both saving & backup emailing of RSVP form data failed',
      errors: {
        saveError: saveError!.message,
        emailError: emailError!.message,
      },
    });
  }
};

export default {
  submitRsvp,
};
