import { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import authService from '../../services/auth';

interface SetEmailStepProps {
  firstName: string;
  lastName: string;
  password: string;
  onNext: () => void;
}

const SetEmailStep = ({
  firstName,
  lastName,
  password,
  onNext,
}: SetEmailStepProps) => {
  const { language } = useOutletContext<Context>();

  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [emailSettingSuccess, setEmailSettingSuccess] =
    useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setErrorMessage(
        {
          English: 'Email addresses do not match',
          Hungarian: 'Az e-mail címek nem egyeznek',
        }[language]
      );
      return;
    }
    if (!emailInputRef.current!.validity.valid || !validator.isEmail(email)) {
      setErrorMessage(
        {
          English: 'The provided email address is invalid',
          Hungarian: 'A megadott e-mail cím érvénytelen',
        }[language]
      );
      return;
    }
    setButtonDisabled(true);
    setErrorMessage('');
    await guestService.setEmail(firstName, lastName, email);
    setEmailSettingSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await authService.login({
      firstName,
      lastName,
      password,
    });
    setLoginSuccess(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <>
      {!emailSettingSuccess && (
        <form onSubmit={handleSetEmail} noValidate>
          <h3>
            {
              {
                English:
                  'Please also set an email address that we can use for communications.',
                Hungarian:
                  'Kérünk, állíts be egy e-mail címet, amin el tudunk érni!',
              }[language]
            }
          </h3>
          <label>
            {
              {
                English: 'Email address',
                Hungarian: 'E-mail cím',
              }[language]
            }
            {':'}
            <input
              ref={emailInputRef}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            {
              {
                English: 'Confirm email address',
                Hungarian: 'E-mail cím újra',
              }[language]
            }
            {':'}
            <input
              type="email"
              autoComplete="off"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </label>
          <button type="submit" disabled={buttonDisabled}>
            {' '}
            {
              {
                English: 'Set email',
                Hungarian: 'E-mail cím beállítása',
              }[language]
            }
          </button>
          <p className="error">{errorMessage}</p>
        </form>
      )}
      {emailSettingSuccess && !loginSuccess && (
        <>
          <h2>
            {
              {
                English: 'Email address set successfully!',
                Hungarian: 'E-mail cím sikeresen beállítva!',
              }[language]
            }
          </h2>
          <h2>
            {
              {
                English: 'Logging you in...',
                Hungarian: 'Bejelentkezés...',
              }[language]
            }
          </h2>
        </>
      )}
      {loginSuccess && (
        <h2>
          {
            {
              English: 'Login successful!',
              Hungarian: 'Sikeres bejelentkezés!',
            }[language]
          }
        </h2>
      )}
    </>
  );
};

export default SetEmailStep;
