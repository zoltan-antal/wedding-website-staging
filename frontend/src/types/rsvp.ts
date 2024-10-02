export enum RsvpFormFieldNames {
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

export type RsvpFormData = {
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
};
