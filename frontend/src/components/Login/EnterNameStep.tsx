import { useState, useEffect, useRef } from 'react';
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
  const [processing, setProcessing] = useState<boolean>(false);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (language === 'English' && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
    if (language === 'Hungarian' && lastNameInputRef.current) {
      lastNameInputRef.current.focus();
    }
  }, [language]);

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      setButtonDisabled(true);
      const guestDetails = await guestService.findGuest(firstName, lastName);
      setErrorMessage('');
      setProcessing(false);
      onNext(firstName, lastName, guestDetails.hasPassword);
    } catch (error) {
      setErrorMessage(
        {
          English: 'Guest not found',
          Hungarian: 'Vendég nem található',
        }[language]
      );
      setButtonDisabled(false);
      setProcessing(false);
    }
  };

  const fields = [
    <label key="firstName">
      {
        {
          English: 'First name',
          Hungarian: 'Keresztnév',
        }[language]
      }
      <input
        ref={firstNameInputRef}
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </label>,
    <label key="lastName">
      {
        {
          English: 'Last name',
          Hungarian: 'Vezetéknév',
        }[language]
      }
      <input
        ref={lastNameInputRef}
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
      {processing && (
        <p className="processing">
          {
            { English: 'Please wait...', Hungarian: 'Kérjük türelmedet...' }[
              language
            ]
          }
        </p>
      )}
      <p className="error">{errorMessage}</p>
    </form>
  );
};

export default EnterNameStep;
