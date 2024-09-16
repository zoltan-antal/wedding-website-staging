import { useState } from 'react';
import guestService from '../../services/guest';

interface EnterNameStepProps {
  onNext: (firstName: string, lastName: string, hasPassword: boolean) => void;
}

const EnterNameStep = ({ onNext }: EnterNameStepProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const guestDetails = await guestService.findGuest(firstName, lastName);
      setErrorMessage('');
      console.log(guestDetails);
      onNext(firstName, lastName, guestDetails.hasPassword);
    } catch (error) {
      setErrorMessage('Guest not found.');
    }
  };

  return (
    <form onSubmit={handleNext}>
      <label>
        First name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button type="submit">Next</button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default EnterNameStep;
