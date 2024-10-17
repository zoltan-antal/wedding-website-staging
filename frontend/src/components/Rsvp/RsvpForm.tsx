import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import rsvpService from '../../services/rsvp';
import RadioCheckbox from './RadioCheckbox';
import RadioGroup from './RadioGroup';
import AutoResizeTextarea from './AutoResizeTextarea';
import { RsvpFormFieldNames } from '../../types/rsvp';
import { RsvpFormData } from '../../types/rsvp';
import { Household } from '../../types/household';

const RsvpForm = () => {
  const { language, household, setHousehold } = useOutletContext<Context>();

  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const [formData, updateFormData] = useImmer<RsvpFormData>({
    guestsAttending: household
      ? Object.fromEntries(
          household.guests.map((guest) => [guest.id, undefined])
        )
      : {},
    requireAccommodation: undefined,
    accommodationPreference: undefined,
    willingToShareTent: undefined,
    requireTransport: undefined,
    dietaryRequirements: '',
    comments: '',
  });
  const [emailCopy, setEmailCopy] = useState<boolean>(true);

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
    if (numberOfAttendingGuests === 0) {
      updateFormData((draft) => {
        draft.requireAccommodation = undefined;
        draft.requireTransport = undefined;
        draft.interestedInMeetAndGreet = undefined;
        draft.interestedInPostWeddingWindDown = undefined;
      });
    }
    if (numberOfAttendingGuests !== 2) {
      updateFormData((draft) => {
        draft.willingToShareTent = undefined;
      });
    }
  }, [numberOfAttendingGuests, updateFormData]);

  useEffect(() => {
    if (!formData.requireAccommodation) {
      updateFormData((draft) => {
        draft.accommodationPreference = undefined;
        draft.willingToShareTent = undefined;
      });
    }
  }, [formData.requireAccommodation, updateFormData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      setButtonDisabled(true);
      const responseBody = await rsvpService.submitRsvp(
        formData,
        emailCopy,
        language
      );
      setSubmissionSuccess(true);

      setTimeout(() => {
        setHousehold(
          (prev) => ({ ...prev, rsvps: responseBody.rsvps } as Household)
        );
        setProcessing(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      setButtonDisabled(false);
      setProcessing(false);
    }
  };

  return (
    <>
      {!submissionSuccess && household && (
        <div className="form-wrapper">
          <h2>
            {
              {
                English: 'Please fill out by 15th January 2025.',
                Hungarian: `Kérjük, 2025. január 15-ig ${
                  household.guests.length > 1 ? 'töltsétek' : 'töltsd'
                } ki!`,
              }[language]
            }
          </h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <span className="first-line">
                  {
                    {
                      English: 'Who will be attending?',
                      Hungarian: 'Ki jön?',
                    }[language]
                  }
                  <span>*</span>
                </span>
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
                    required={true}
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
                      })
                    }
                    label={
                      {
                        English:
                          'Do you require accommodation for Saturday night?',
                        Hungarian: `${
                          numberOfAttendingGuests > 1
                            ? 'Igényeltek'
                            : 'Igényelsz'
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
                    required={true}
                    markedRequired={true}
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
                            formData.accommodationPreference ===
                            'no preference',
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
                      required={true}
                      markedRequired={true}
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
                        required={true}
                        markedRequired={true}
                      ></RadioCheckbox>
                    )}
                  <RadioCheckbox
                    checked={formData.requireTransport}
                    name={RsvpFormFieldNames.RequireTransport}
                    onYes={() =>
                      updateFormData((draft) => {
                        draft.requireTransport = true;
                      })
                    }
                    onNo={() =>
                      updateFormData((draft) => {
                        draft.requireTransport = false;
                      })
                    }
                    label={
                      {
                        English:
                          'Are you planning on making your own way to the venue or will you require transport?\nWe will be providing transport between Budapest and the venue.\nFree parking is available at the venue.',
                        Hungarian: `Egyedül ${
                          numberOfAttendingGuests > 1 ? 'terveztek' : 'tervezel'
                        } eljutni a helyszínre, vagy ${
                          numberOfAttendingGuests > 1
                            ? 'szükségetek'
                            : 'szükséged'
                        } lesz utaztatásra?\nA helyszínen ingyenes parkolás lehetséges.\nBudapest és a helyszín között tudjuk biztosítani az utazást.`,
                      }[language]
                    }
                    trueLabel={
                      {
                        English: 'Require transport',
                        Hungarian: `Utaztatást ${
                          numberOfAttendingGuests > 1
                            ? 'igényelnénk'
                            : 'igényelnék'
                        }`,
                      }[language]
                    }
                    falseLabel={
                      {
                        English: 'Making my own way',
                        Hungarian: `Külön ${
                          numberOfAttendingGuests > 1 ? 'jövünk' : 'jövök'
                        }`,
                      }[language]
                    }
                    required={true}
                    markedRequired={true}
                  ></RadioCheckbox>
                  <label>
                    {
                      {
                        English:
                          'Are there any allergies or dietary requirements that we should be aware of?',
                        Hungarian:
                          'Bármilyen allergia vagy speciális étkezési igény, amiről tudnunk kell?',
                      }[language]
                    }
                    <AutoResizeTextarea
                      name={RsvpFormFieldNames.DietaryRequirements}
                      value={formData.dietaryRequirements}
                      onChange={(e) => {
                        updateFormData((draft) => {
                          draft.dietaryRequirements = e.target.value;
                        });
                      }}
                    ></AutoResizeTextarea>
                  </label>
                  <RadioCheckbox
                    checked={formData.interestedInMeetAndGreet}
                    name={RsvpFormFieldNames.InterestedInMeetAndGreet}
                    onYes={() =>
                      updateFormData((draft) => {
                        draft.interestedInMeetAndGreet = true;
                      })
                    }
                    onNo={() =>
                      updateFormData((draft) => {
                        draft.interestedInMeetAndGreet = false;
                      })
                    }
                    label={
                      {
                        English:
                          "Would you be interested in coming to a meet & greet the day before the wedding?\nIt'd be a chance to meet others who are coming to the wedding before the big day. It will most likely be held in Budapest.",
                        Hungarian: `Érdekelne egy ismerkedős délután az esküvő előtti napon?\nEz egy lehetőség lenne arra, hogy kicsit ${
                          numberOfAttendingGuests > 1
                            ? 'megismerjétek'
                            : 'megismerd'
                        } a többi vendéget, aki jön az esküvőre. Ez valószínűleg Budapesten lenne.`,
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
                    required={true}
                    markedRequired={true}
                  ></RadioCheckbox>
                  <RadioCheckbox
                    checked={formData.interestedInPostWeddingWindDown}
                    name={RsvpFormFieldNames.InterestedInPostWeddingWindDown}
                    onYes={() =>
                      updateFormData((draft) => {
                        draft.interestedInPostWeddingWindDown = true;
                      })
                    }
                    onNo={() =>
                      updateFormData((draft) => {
                        draft.interestedInPostWeddingWindDown = false;
                      })
                    }
                    label={
                      {
                        English:
                          'Would you be interested in joining us on a post-wedding trip down to Lake Balaton?\nThink chilling by (or swimming in) the lake, BBQ and other fun things. We will take the train down from Budapest on Monday and stay overnight, heading back Tuesday afternoon or evening.\nDetails will depend on interest.',
                        Hungarian: `Lenne ${
                          numberOfAttendingGuests > 1 ? 'kedvetek' : 'kedved'
                        } csatlakozni hozzánk egy esküvő utáni kiruccanásra a Balatonon?\nStrandolásra, sütögetésre és hasonló programokra gondoltunk. Hétfőn mennénk le vonattal, egy éjszakát ott töltenénk, és kedd délután vagy este jönnénk vissza.\nTovábbi részletek az érdeklődés függvényében.`,
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
                    required={true}
                    markedRequired={true}
                  ></RadioCheckbox>
                  <label>
                    {
                      {
                        English: `Is there anything else you'd like to add?`,
                        Hungarian: 'Egyéb megjegyzés',
                      }[language]
                    }
                    <AutoResizeTextarea
                      name={RsvpFormFieldNames.Comments}
                      value={formData.comments}
                      onChange={(e) => {
                        updateFormData((draft) => {
                          draft.comments = e.target.value;
                        });
                      }}
                    ></AutoResizeTextarea>
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
            <RadioCheckbox
              checked={emailCopy}
              name={'emailCopy'}
              onYes={() => setEmailCopy(true)}
              onNo={() => setEmailCopy(false)}
              label={
                {
                  English: 'Send me an email copy of my responses',
                  Hungarian: 'Kérek e-mailben másolatot a kitöltött űrlapról',
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
              required={true}
              markedRequired={true}
            ></RadioCheckbox>
            <button type="submit" disabled={buttonDisabled}>
              {
                {
                  English: 'Submit',
                  Hungarian: 'Elküldés',
                }[language]
              }
            </button>
            {processing && (
              <p className="processing">
                {
                  {
                    English: 'Please wait...',
                    Hungarian: 'Kérjük türelmedet...',
                  }[language]
                }
              </p>
            )}
          </form>
        </div>
      )}
      {submissionSuccess && (
        <h2>
          {
            {
              English: 'Form successfully sent!',
              Hungarian: 'Űrlap sikeresen elküldve!',
            }[language]
          }
        </h2>
      )}
    </>
  );
};

export default RsvpForm;
