import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';
import EnterNameStep from './EnterNameStep';
import EnterPasswordStep from './EnterPasswordStep';
import CreatePasswordStep from './CreatePasswordStep';

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
