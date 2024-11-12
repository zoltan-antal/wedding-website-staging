import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { GuestAttributes } from '../models/guests';
import guestService from '../services/guestService';
import rsvpService from '../services/rsvpService';
import {
  RESEND_API_KEY,
  RESEND_EMAIL,
  INTERNAL_EMAIL,
  NODE_ENV,
} from '../utils/config';

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
  body: {
    formData: RsvpFormData;
    emailCopy: boolean;
    language: 'English' | 'Hungarian';
  };
}

const submitRsvp = async (req: RsvpSubmissionRequest, res: Response) => {
  const { formData, emailCopy, language } = req.body;
  const guest = req.user as GuestAttributes;
  const dateTime = new Date();

  let saveError: Error | null = null;
  let emailError: Error | null = null;

  // CSV
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

    const dataDirectoryName = `data${NODE_ENV !== 'production' ? '-test' : ''}`;
    const dataDirectoryPath = path.join(__dirname, '../..', dataDirectoryName);
    const csvFilePath = path.join(
      __dirname,
      '../..',
      dataDirectoryName,
      'rsvpData.csv'
    );
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

  // BACKUP EMAIL
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
      from: RESEND_EMAIL,
      to: INTERNAL_EMAIL,
      subject: `RSVP form submitted by ${guest.lastName}, ${guest.firstName}`,
      html: emailBody,
    });
  } catch (error) {
    console.error(error);
    emailError = error as Error;
  }

  // DATABASE
  await rsvpService.createRsvp({
    id: undefined,
    guestId: guest.id,
    householdId: guest.householdId,
    data: JSON.stringify(formData),
  });

  // EMAIL COPY
  if (emailCopy) {
    try {
      const guestsAttendingArray = await Promise.all(
        Object.entries(formData.guestsAttending).map(
          async ([guestId, isComing]) => {
            const guest = await guestService.getGuest(Number(guestId));
            return [guest?.firstName, isComing];
          }
        )
      );

      const booleanToText = (isTrue: boolean) => {
        return isTrue
          ? { English: 'yes', Hungarian: 'igen' }[language]
          : { English: 'no', Hungarian: 'nem' }[language];
      };
      const accommodationPreferenceToText = (
        preference: RsvpFormData[RsvpFormFieldNames.AccommodationPreference]
      ) => {
        if (preference === 'tent') {
          return { English: 'tent', Hungarian: 'sátor' }[language];
        } else if (preference === 'hotel') {
          return { English: 'hotel', Hungarian: 'hotel' }[language];
        } else if (preference === 'no preference') {
          return { English: 'no preference', Hungarian: 'mindegy' }[language];
        } else {
          return '';
        }
      };

      const emailBody = `${
        {
          English: 'RSVP form successfully submitted!',
          Hungarian: 'Visszajelzési űrlap sikeresen elküldve!',
        }[language]
      }\n\n${
        {
          English: 'Guests',
          Hungarian: 'Vendégek',
        }[language]
      }\n${guestsAttendingArray
        .map(
          ([guest, isComing]) =>
            `${guest}: ${
              isComing ? '' : { English: 'not ', Hungarian: 'nem ' }[language]
            }${{ English: 'coming', Hungarian: 'jön' }[language]}`
        )
        .join('\n')}\n\n${
        formData.requireAccommodation !== undefined
          ? `${
              {
                English: 'Require accommodation',
                Hungarian: 'Szállás igény',
              }[language]
            }: ${booleanToText(formData.requireAccommodation)}\n`
          : ''
      }${
        formData.accommodationPreference !== undefined
          ? `${
              {
                English: 'Accommodation preference',
                Hungarian: 'Szállás preferencia',
              }[language]
            }: ${accommodationPreferenceToText(
              formData.accommodationPreference
            )}\n`
          : ''
      }${
        formData.willingToShareTent !== undefined
          ? `${
              {
                English: 'Willing to share tent',
                Hungarian: 'Sátor esetleges megosztása',
              }[language]
            }: ${booleanToText(formData.willingToShareTent)}\n`
          : ''
      }${
        formData.requireTransport !== undefined
          ? `${
              {
                English: 'Require transport',
                Hungarian: 'Utaztatás igény',
              }[language]
            }: ${booleanToText(formData.requireTransport)}\n`
          : ''
      }${
        formData.dietaryRequirements !== undefined
          ? `${
              {
                English: 'Dietary requirements',
                Hungarian: 'Allergia / különleges étrend',
              }[language]
            }: ${
              formData.dietaryRequirements ? formData.dietaryRequirements : '-'
            }\n`
          : ''
      }${
        formData.interestedInMeetAndGreet !== undefined
          ? `${
              {
                English: 'Interested in meet & greet',
                Hungarian: 'Ismerkedős délután érdeklődés',
              }[language]
            }: ${booleanToText(formData.interestedInMeetAndGreet)}\n`
          : ''
      }${
        formData.interestedInPostWeddingWindDown !== undefined
          ? `${
              {
                English: 'Interested in post-wedding trip',
                Hungarian: 'Esküvő utáni kiruccanás érdeklődés',
              }[language]
            }: ${booleanToText(formData.interestedInPostWeddingWindDown)}\n`
          : ''
      }${
        formData.comments !== undefined
          ? `${
              {
                English: 'Comments',
                Hungarian: 'Megjegyzés',
              }[language]
            }: ${formData.comments ? formData.comments : '-'}\n`
          : ''
      }`;

      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: RESEND_EMAIL,
        to: guest.email,
        subject: {
          English: 'Ella & Zoltan wedding RSVP',
          Hungarian: 'Ella és Zoltán esküvői visszajelzés',
        }[language],
        text: emailBody,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const rsvpSubmissions = await rsvpService.findRsvpsByHouseholdId(
    guest.householdId
  );

  if (!saveError && !emailError) {
    return res.status(200).json({
      message: 'Successfully saved & backup emailed RSVP form data',
      rsvps: rsvpSubmissions,
    });
  } else if (saveError && !emailError) {
    return res.status(200).json({
      message: 'Successfully backup emailed RSVP form data, but saving failed',
      error: saveError.message,
      rsvps: rsvpSubmissions,
    });
  } else if (emailError && !saveError) {
    return res.status(200).json({
      message: 'Successfully saved RSVP form data, but backup emailing failed',
      error: emailError.message,
      rsvps: rsvpSubmissions,
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
