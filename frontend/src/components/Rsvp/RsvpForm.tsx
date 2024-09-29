import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
// import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RadioCheckbox from './RadioCheckbox';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
  RequireAccommodation = 'requireAccommodation',
  AccommodationPreference = 'accommodationPreference',
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
    dietaryRequirements: '',
    comments: '',
  });

  useEffect(() => {
    updateFormData((draft) => {
      draft.guestsAttending = household
        ? Object.fromEntries(
            household.guests.map((guest) => [guest.id, undefined])
          )
        : {};
    });
  }, [household, updateFormData]);

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
                  // value={guest.id}
                  onYes={() =>
                    // updateFormData((draft) => {
                    //   draft.guestsAttending.push(Number(e.target.value));
                    // })
                    updateFormData((draft) => {
                      draft.guestsAttending![guest.id] = true;
                    })
                  }
                  onNo={() =>
                    // updateFormData((draft) => {
                    //   draft.guestsAttending = draft.guestsAttending.filter(
                    //     (guestId) => guestId !== Number(e.target.value)
                    //   );
                    // })
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
                    })
                  }
                  label={
                    {
                      English:
                        'Do you require accommodation for Saturday night?',
                      Hungarian: `${
                        household.guests.length > 1 ? 'Igényeltek' : 'Igényelsz'
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
                {household.special && formData.requireAccommodation && (
                  <fieldset>
                    <legend>
                      {
                        {
                          English:
                            'Would you like to stay at the venue in a glamping tent or in a hotel in the nearby town of Vác?',
                          Hungarian:
                            'A helyszínen szeretnél aludni glamping sátorban vagy egy közeli hotelben Vácon?',
                        }[language]
                      }
                      <br></br>
                      {
                        {
                          English:
                            'Transport will be provided to the hotel during the course of the evening.',
                          Hungarian:
                            'Biztosítjuk az utazást a hotelbe az este folyamán.',
                        }[language]
                      }
                    </legend>
                    <label>
                      <input
                        type="radio"
                        name={RsvpFormFieldNames.AccommodationPreference}
                        checked={formData.accommodationPreference === 'tent'}
                        onChange={() =>
                          updateFormData((draft) => {
                            draft.accommodationPreference = 'tent';
                          })
                        }
                      />
                      {
                        {
                          English: 'At the venue',
                          Hungarian: 'A helyszínen',
                        }[language]
                      }
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={RsvpFormFieldNames.AccommodationPreference}
                        checked={formData.accommodationPreference === 'hotel'}
                        onChange={() =>
                          updateFormData((draft) => {
                            draft.accommodationPreference = 'hotel';
                          })
                        }
                      />
                      {
                        {
                          English: 'In a hotel',
                          Hungarian: 'Hotelben',
                        }[language]
                      }
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={RsvpFormFieldNames.AccommodationPreference}
                        checked={
                          formData.accommodationPreference === 'no preference'
                        }
                        onChange={() =>
                          updateFormData((draft) => {
                            draft.accommodationPreference = 'no preference';
                          })
                        }
                      />
                      {
                        {
                          English: 'No preference',
                          Hungarian: 'Mindegy',
                        }[language]
                      }
                    </label>
                  </fieldset>
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
