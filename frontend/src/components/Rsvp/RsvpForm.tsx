import { useState } from 'react';
import { useImmer } from 'use-immer';
// import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RadioCheckbox from './RadioCheckbox';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
}

interface RsvpFormData {
  [RsvpFormFieldNames.GuestsAttending]: number[];
}

const RsvpForm = () => {
  const { language, household } = useOutletContext<Context>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [formData, updateFormData] = useImmer<RsvpFormData>({
    [RsvpFormFieldNames.GuestsAttending]:
      household?.guests.map((guest) => guest.id) || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const groupName = name.split('.')[0] as keyof RsvpFormData;

    updateFormData((draft) => {
      if (type === 'radio') {
        if (groupName === RsvpFormFieldNames.GuestsAttending) {
          const id = Number(name.split('.')[1]);
          if (value == 'true') {
            draft.guestsAttending.push(id);
          } else {
            draft.guestsAttending = draft.guestsAttending.filter(
              (guestId) => guestId !== id
            );
          }
        }
      }
    });
  };

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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              {
                {
                  English: 'Will you be attending?',
                  Hungarian: 'Ott leszel?',
                }[language]
              }
            </legend>
            {household.guests.map((guest) => (
              <RadioCheckbox
                key={guest.id}
                checked={formData.guestsAttending.includes(guest.id)}
                name={`${RsvpFormFieldNames.GuestsAttending}.${guest.id}`}
                onChange={handleChange}
                label={
                  {
                    English: `${guest.firstName} ${guest.lastName}`,
                    Hungarian: `${guest.lastName} ${guest.firstName}`,
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
            ))}
          </fieldset>
          {!formData.guestsAttending.length && (
            <p>
              {
                {
                  English: "We're sorry you can't attend!",
                  Hungarian: `Sajnáljuk, hogy nem ${
                    household.guests.length > 1 ? 'tudtok' : 'tudsz'
                  } részt venni!`,
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
