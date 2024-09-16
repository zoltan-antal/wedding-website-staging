import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
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

const Login = () => {
  const [step, setStep] = useState<
    'enter-name' | 'enter-password' | 'create-password'
  >('enter-name');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const navigate = useNavigate();

  const handleNext = (
    firstName: string,
    lastName: string,
    hasPassword: boolean
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    if (hasPassword) {
      setStep('enter-password');
    } else {
      setStep('create-password');
    }
  };

  const handleLogin = () => {
    navigate(-1);
  };

  const handleCreatePassword = async (password: string) => {
    alert('Password created successfully!');
    const response = await authService.login({
      firstName,
      lastName,
      password,
    });
    console.log(response);
    navigate(-1);
  };

  return (
    <main>
      <h1>Guest login</h1>
      {step === 'enter-name' && <EnterNameStep onNext={handleNext} />}
      {step === 'enter-password' && (
        <EnterPasswordStep
          firstName={firstName}
          lastName={lastName}
          onLogin={handleLogin}
        />
      )}
      {step === 'create-password' && (
        <CreatePasswordStep
          firstName={firstName}
          lastName={lastName}
          onCreatePassword={handleCreatePassword}
        />
      )}
    </main>
  );
};

export default Login;
