import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import authService from '../../services/auth';

interface CreatePasswordStepProps {
  firstName: string;
  lastName: string;
  onLogin: () => void;
}

const CreatePasswordStep = ({
  firstName,
  lastName,
  onLogin,
}: CreatePasswordStepProps) => {
  const { language } = useOutletContext<Context>();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [passwordCreationSuccess, setPasswordCreationSuccess] =
    useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(
        {
          English: 'Passwords do not match.',
          Hungarian: 'A jelszavak nem egyeznek.',
        }[language]
      );
      return;
    }
    if (password.length < 6) {
      setErrorMessage(
        {
          English: 'Password must be at least 6 characters long.',
          Hungarian: 'A jelszónak minimum 6 karakter hosszúnak kell lennie.',
        }[language]
      );
      return;
    }
    setButtonDisabled(true);
    setErrorMessage('');
    await guestService.createPassword(firstName, lastName, password);
    setPasswordCreationSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await authService.login({
      firstName,
      lastName,
      password,
    });
    setLoginSuccess(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <>
      {!passwordCreationSuccess && (
        <form onSubmit={handleCreatePassword}>
          <h3>
            {
              {
                English:
                  "You're logging in for the first time. Please create a password.",
                Hungarian: 'Először jelentkezel be. Hozz létre egy jelszót!',
              }[language]
            }
          </h3>
          <label>
            {
              {
                English: 'Password',
                Hungarian: 'Jelszó',
              }[language]
            }
            {':'}
            <input
              ref={passwordInputRef}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            {
              {
                English: 'Confirm password',
                Hungarian: 'Jelszó újra',
              }[language]
            }
            {':'}
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={buttonDisabled}>
            {' '}
            {
              {
                English: 'Create password',
                Hungarian: 'Jelszó létrehozása',
              }[language]
            }
          </button>
          <p>{errorMessage}</p>
        </form>
      )}
      {passwordCreationSuccess && !loginSuccess && (
        <>
          <h2>
            {
              {
                English: 'Password created successfully!',
                Hungarian: 'Jelszó sikeresen létrehozva!',
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

export default CreatePasswordStep;
