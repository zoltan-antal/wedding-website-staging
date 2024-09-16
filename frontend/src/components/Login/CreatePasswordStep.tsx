import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
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
  const { language } = useOutletContext<Context>();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    const response = await guestService.createPassword(
      firstName,
      lastName,
      password
    );
    setErrorMessage('');
    console.log(response);
    onCreatePassword(password);
  };

  return (
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
          type="password"
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type="submit">
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
  );
};

export default CreatePasswordStep;
