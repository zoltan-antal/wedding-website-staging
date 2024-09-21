import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';

interface EnterNameStepProps {
  onNext: (firstName: string, lastName: string, hasPassword: boolean) => void;
}

const EnterNameStep = ({ onNext }: EnterNameStepProps) => {
  const { language } = useOutletContext<Context>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonDisabled(true);
      const guestDetails = await guestService.findGuest(firstName, lastName);
      setErrorMessage('');
      console.log(guestDetails);
      onNext(firstName, lastName, guestDetails.hasPassword);
    } catch (error) {
      setErrorMessage(
        {
          English: 'Guest not found.',
          Hungarian: 'Vendég nem található.',
        }[language]
      );
      setButtonDisabled(false);
    }
  };

  const fields = [
    <label>
      {
        {
          English: 'First name',
          Hungarian: 'Keresztnév',
        }[language]
      }
      {':'}
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </label>,
    <label>
      {
        {
          English: 'Last name',
          Hungarian: 'Vezetéknév',
        }[language]
      }
      {':'}
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </label>,
  ];

  return (
    <form onSubmit={handleNext}>
      {language === 'English' ? fields : fields.reverse()}
      <button type="submit" disabled={buttonDisabled}>
        {
          {
            English: 'Next',
            Hungarian: 'Tovább',
          }[language]
        }
      </button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default EnterNameStep;
