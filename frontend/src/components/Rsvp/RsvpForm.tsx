import { useState } from 'react';
// import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
}

interface RsvpFormData {
  [RsvpFormFieldNames.GuestsAttending]: number[];
}

const RsvpForm = () => {
  const { language, household } = useOutletContext<Context>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [formData, setFormData] = useState<RsvpFormData>({
    [RsvpFormFieldNames.GuestsAttending]:
      household?.guests.map((guest) => guest.id) || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const groupName = name.split('.')[0] as keyof RsvpFormData;

    if (type === 'checkbox') {
      if (groupName === RsvpFormFieldNames.GuestsAttending) {
        const id = Number(value);

        setFormData((prevData) => {
          const updatedGroup = checked
            ? [...prevData[groupName], id]
            : prevData[groupName].filter((item) => item !== id);

          return { ...prevData, [groupName]: updatedGroup };
        });
      }
    }
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
          <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
            <legend>
              {
                {
                  English: 'Who will be coming?',
                  Hungarian: 'Ki fog jönni?',
                }[language]
              }
            </legend>
            {household!.guests.map((guest) => (
              <label key={guest.id}>
                <input
                  type="checkbox"
                  // name="guestsAttending"
                  name={`${RsvpFormFieldNames.GuestsAttending}.${guest.id}`}
                  value={guest.id}
                  checked={formData.guestsAttending.includes(guest.id)}
                  onChange={handleChange}
                />
                {
                  {
                    English: `${guest.firstName} ${guest.lastName}`,
                    Hungarian: `${guest.lastName} ${guest.firstName}`,
                  }[language]
                }
              </label>
            ))}
          </fieldset>
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
