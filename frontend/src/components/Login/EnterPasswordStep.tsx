import { useState } from 'react';
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
      setErrorMessage('Invalid password.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Next</button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default EnterPasswordStep;
