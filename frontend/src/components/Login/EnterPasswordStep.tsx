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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        firstName,
        lastName,
        password,
      });
      setErrorMessage('');
      console.log(response);
      onLogin();
    } catch (error) {
      setErrorMessage(
        {
          English: 'Invalid password.',
          Hungarian: 'Helytelen jelszó.',
        }[language]
      );
    }
  };

  return (
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
      <button type="submit">
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
  );
};

export default EnterPasswordStep;
