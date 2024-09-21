import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import authService from '../../services/auth';

interface EnterPasswordStepProps {
  firstName: string;
  lastName: string;
  onLogin: () => void;
}

const EnterPasswordStep = ({
  firstName,
  lastName,
  onLogin,
}: EnterPasswordStepProps) => {
  const { language } = useOutletContext<Context>();

  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

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
        onLogin();
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
              type="password"
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
