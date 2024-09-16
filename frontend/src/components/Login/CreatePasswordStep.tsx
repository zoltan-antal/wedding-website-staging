import { useState } from 'react';
import guestService from '../../services/guest';

interface CreatePasswordStepProps {
  firstName: string;
  lastName: string;
  onCreatePassword: (password: string) => void;
}

const CreatePasswordStep = ({
  firstName,
  lastName,
  onCreatePassword,
}: CreatePasswordStepProps) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await guestService.createPassword(
        firstName,
        lastName,
        password
      );
      setErrorMessage('');
      console.log(response);
      onCreatePassword(password);
    } catch (error) {
      setErrorMessage('Invalid password.');
    }
  };

  return (
    <form onSubmit={handleCreatePassword}>
      <h3>You're logging in for the first time. Please create a password.</h3>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type="submit">Next</button>
      <p>{errorMessage}</p>
    </form>
  );
};

export default CreatePasswordStep;
