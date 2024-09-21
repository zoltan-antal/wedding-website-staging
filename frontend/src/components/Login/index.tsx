import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import EnterNameStep from './EnterNameStep';
import EnterPasswordStep from './EnterPasswordStep';
import CreatePasswordStep from './CreatePasswordStep';

const Login = () => {
  const [step, setStep] = useState<
    'enter-name' | 'enter-password' | 'create-password'
  >('enter-name');
  const { language, setGuest } = useOutletContext<Context>();

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

  const handleLogin = async () => {
    const guestData = await guestService.me();
    setGuest(guestData);
    navigate(-1);
  };

  // const handleCreatePassword = async (password: string) => {
  //   alert(
  //     {
  //       English: 'Password created successfully!',
  //       Hungarian: 'Jelszó sikeresen létrehozva!',
  //     }[language]
  //   );
  //   const response = await authService.login({
  //     firstName,
  //     lastName,
  //     password,
  //   });
  //   console.log(response);
  //   handleLogin();
  // };

  return (
    <main>
      <h1>
        {
          {
            English: 'Guest login',
            Hungarian: 'Vendég bejelentkezés',
          }[language]
        }
      </h1>
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
          onLogin={handleLogin}
        />
      )}
    </main>
  );
};

export default Login;
