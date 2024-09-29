import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
// import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RadioCheckbox from './RadioCheckbox';
import RadioGroup from './RadioGroup';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
  RequireAccommodation = 'requireAccommodation',
  AccommodationPreference = 'accommodationPreference',
  WillingToShareTent = 'willingToShareTent',
  DietaryRequirements = 'dietaryRequirements',
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
  [RsvpFormFieldNames.DietaryRequirements]: string;
  [RsvpFormFieldNames.Comments]: string;
}

const RsvpForm = () => {
  const { language, household } = useOutletContext<Context>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [formData, updateFormData] = useImmer<RsvpFormData>({
    guestsAttending: household
      ? Object.fromEntries(
          household.guests.map((guest) => [guest.id, undefined])
        )
      : {},
    requireAccommodation: undefined,
    accommodationPreference: undefined,
    willingToShareTent: undefined,
    dietaryRequirements: '',
    comments: '',
  });

  const [numberOfAttendingGuests, setNumberOfAttendingGuests] = useState(0);

  useEffect(() => {
    updateFormData((draft) => {
      draft.guestsAttending = household
        ? Object.fromEntries(
            household.guests.map((guest) => [guest.id, undefined])
          )
        : {};
    });
  }, [household, updateFormData]);

  useEffect(() => {
    setNumberOfAttendingGuests(
      Object.values(formData.guestsAttending).filter((val) => !!val).length
    );
  }, [formData.guestsAttending]);

  useEffect(() => {
    if (numberOfAttendingGuests !== 2) {
      updateFormData((draft) => {
        draft.willingToShareTent = undefined;
      });
    }
  }, [numberOfAttendingGuests, updateFormData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonDisabled(true);
    } catch (error) {
      setButtonDisabled(false);
    }
  };

  return (
    <>
      {household && (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <fieldset>
            <legend>
              {
                {
                  English: 'Who will be attending?',
                  Hungarian: 'Ki jön?',
                }[language]
              }
            </legend>
            {household.guests
              .toSorted((a, b) => {
                const nameA = a.firstName.toLowerCase();
                const nameB = b.firstName.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              })
              .map((guest) => (
                <RadioCheckbox
                  key={guest.id}
                  checked={
                    formData.guestsAttending === undefined
                      ? undefined
                      : formData.guestsAttending[guest.id]
                  }
                  name={`${RsvpFormFieldNames.GuestsAttending}.${guest.id}`}
                  onYes={() =>
                    updateFormData((draft) => {
                      draft.guestsAttending![guest.id] = true;
                    })
                  }
                  onNo={() =>
                    updateFormData((draft) => {
                      draft.guestsAttending![guest.id] = false;
                    })
                  }
                  label={guest.firstName}
                  trueLabel={
                    {
                      English: "I'll be there",
                      Hungarian: 'Ott leszek',
                    }[language]
                  }
                  falseLabel={
                    {
                      English: "I can't make it",
                      Hungarian: 'Nem tudok jönni',
                    }[language]
                  }
                ></RadioCheckbox>
              ))}
          </fieldset>
          {Object.values(formData.guestsAttending).every(
            (val) => val !== undefined
          ) &&
            Object.values(formData.guestsAttending).some((val) => !!val) && (
              <>
                <RadioCheckbox
                  checked={formData.requireAccommodation}
                  name={RsvpFormFieldNames.RequireAccommodation}
                  onYes={() =>
                    updateFormData((draft) => {
                      draft.requireAccommodation = true;
                    })
                  }
                  onNo={() =>
                    updateFormData((draft) => {
                      draft.requireAccommodation = false;
                      draft.accommodationPreference = undefined;
                      draft.willingToShareTent = undefined;
                    })
                  }
                  label={
                    {
                      English:
                        'Do you require accommodation for Saturday night?',
                      Hungarian: `${
                        numberOfAttendingGuests > 1 ? 'Igényeltek' : 'Igényelsz'
                      } szállást szombat éjszakára?`,
                    }[language]
                  }
                  trueLabel={
                    {
                      English: 'Yes',
                      Hungarian: 'Igen',
                    }[language]
                  }
                  falseLabel={
                    {
                      English: 'No',
                      Hungarian: 'Nem',
                    }[language]
                  }
                ></RadioCheckbox>
                {formData.requireAccommodation && household.special && (
                  <RadioGroup
                    name={RsvpFormFieldNames.AccommodationPreference}
                    label={
                      {
                        English:
                          'Would you like to stay at the venue in a glamping tent or in a hotel in the nearby town of Vác?\nTransport will be provided to the hotel during the course of the evening.',
                        Hungarian:
                          'A helyszínen szeretnél aludni glamping sátorban vagy egy közeli hotelben Vácon?\nBiztosítjuk az utazást a hotelbe az este folyamán.',
                      }[language]
                    }
                    entries={[
                      {
                        checked: formData.accommodationPreference === 'tent',
                        value: 'tent',
                        label: {
                          English: 'At the venue',
                          Hungarian: 'A helyszínen',
                        }[language],
                      },
                      {
                        checked: formData.accommodationPreference === 'hotel',
                        value: 'hotel',
                        label: {
                          English: 'In a hotel',
                          Hungarian: 'Hotelben',
                        }[language],
                      },
                      {
                        checked:
                          formData.accommodationPreference === 'no preference',
                        value: 'no preference',
                        label: {
                          English: 'No preference',
                          Hungarian: 'Mindegy',
                        }[language],
                      },
                    ]}
                    onChange={(e) => {
                      updateFormData((draft) => {
                        draft.accommodationPreference = e.target
                          .value as RsvpFormData[RsvpFormFieldNames.AccommodationPreference];
                      });
                    }}
                  ></RadioGroup>
                )}
                {formData.requireAccommodation &&
                  household.special === false &&
                  household.type === 'couple' &&
                  numberOfAttendingGuests === 2 && (
                    <RadioCheckbox
                      checked={formData.willingToShareTent}
                      name={RsvpFormFieldNames.WillingToShareTent}
                      onYes={() =>
                        updateFormData((draft) => {
                          draft.willingToShareTent = true;
                        })
                      }
                      onNo={() =>
                        updateFormData((draft) => {
                          draft.willingToShareTent = false;
                        })
                      }
                      label={
                        {
                          English:
                            'Would you be willing to share a tent with another couple?',
                          Hungarian:
                            'Vállalnátok, hogy egy sátorban legyetek egy másik párral?',
                        }[language]
                      }
                      trueLabel={
                        {
                          English: 'Yes',
                          Hungarian: 'Igen',
                        }[language]
                      }
                      falseLabel={
                        {
                          English: 'Rather not',
                          Hungarian: 'Inkább nem',
                        }[language]
                      }
                    ></RadioCheckbox>
                  )}
                <label>
                  {
                    {
                      English:
                        'Are there any allergies or dietary requirements that we should be aware of?',
                      Hungarian:
                        'Bármilyen allergia vagy különleges étrendi követelmény, amiről tudnunk kell?',
                    }[language]
                  }
                  <input
                    type="textarea"
                    name={RsvpFormFieldNames.DietaryRequirements}
                    value={formData.dietaryRequirements}
                    onChange={(e) => {
                      updateFormData((draft) => {
                        draft.dietaryRequirements = e.target.value;
                      });
                    }}
                  />
                </label>
                <label>
                  {
                    {
                      English: `Is there anything else you'd like to add?`,
                      Hungarian: 'Van bármi más, amiről tudnunk kell?',
                    }[language]
                  }
                  <input
                    type="textarea"
                    name={RsvpFormFieldNames.DietaryRequirements}
                    value={formData.dietaryRequirements}
                    onChange={(e) => {
                      updateFormData((draft) => {
                        draft.dietaryRequirements = e.target.value;
                      });
                    }}
                  />
                </label>
              </>
            )}
          {Object.values(formData.guestsAttending).every(
            (val) => val === false
          ) && (
            <p>
              {
                {
                  English: "We'll miss you!",
                  Hungarian: `Hiányozni ${
                    household.guests.length > 1 ? 'fogtok' : 'fogsz'
                  }!`,
                }[language]
              }
            </p>
          )}
          <button type="submit" disabled={buttonDisabled}>
            {' '}
            {
              {
                English: 'Submit',
                Hungarian: 'Elküldés',
              }[language]
            }
          </button>
        </form>
      )}
    </>
  );
};

export default RsvpForm;
