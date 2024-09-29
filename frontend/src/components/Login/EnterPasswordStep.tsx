import { useState, useEffect, useRef } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import authService from '../../services/auth';

interface EnterPasswordStepProps {
  firstName: string;
  lastName: string;
  onNext: () => void;
}

const EnterPasswordStep = ({
  firstName,
  lastName,
  onNext,
}: EnterPasswordStepProps) => {
  const { language } = useOutletContext<Context>();

  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonDisabled(true);
      await authService.login({
        firstName,
        lastName,
        password,
      });
      setErrorMessage('');
      setLoginSuccess(true);
      setTimeout(() => {
        onNext();
      }, 1000);
    } catch (error) {
      setErrorMessage(
        {
          English: 'Invalid password.',
          Hungarian: 'Helytelen jelszó.',
        }[language]
      );
      setButtonDisabled(false);
    }
  };

  return (
    <>
      {!loginSuccess && (
        <>
          <form onSubmit={handleLogin}>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" disabled={buttonDisabled}>
              {' '}
              {
                {
                  English: 'Login',
                  Hungarian: 'Bejelentkezés',
                }[language]
              }
            </button>
            <p>{errorMessage}</p>
          </form>
          <NavLink to="/reset-password">
            {
              {
                English: 'Forgot password?',
                Hungarian: 'Elfelejtetted a jelszavad?',
              }[language]
            }
          </NavLink>
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

export default EnterPasswordStep;
