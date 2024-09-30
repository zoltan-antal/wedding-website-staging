import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import householdService from '../../services/household';
import EnterNameStep from './EnterNameStep';
import EnterPasswordStep from './EnterPasswordStep';
import CreatePasswordStep from './CreatePasswordStep';
import SetEmailStep from './SetEmailStep';

const Login = () => {
  const [step, setStep] = useState<
    'enter-name' | 'enter-password' | 'create-password' | 'set-email'
  >('enter-name');
  const { language, guest, setGuest, setHousehold } =
    useOutletContext<Context>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (guest) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameEntered = (
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

  const handlePasswordCreated = (password: string) => {
    setPassword(password);
    setStep('set-email');
  };

  const handleLogin = async () => {
    const guestData = await guestService.me();
    setGuest(guestData);
    const householdData = await householdService.me();
    setHousehold(householdData);
    navigate(queryParams.get('redirectTo') || '/');
  };

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
      {step === 'enter-name' && <EnterNameStep onNext={handleNameEntered} />}
      {step === 'enter-password' && (
        <EnterPasswordStep
          firstName={firstName}
          lastName={lastName}
          onNext={handleLogin}
        />
      )}
      {step === 'create-password' && (
        <CreatePasswordStep
          firstName={firstName}
          lastName={lastName}
          onNext={handlePasswordCreated}
        />
      )}
      {step === 'set-email' && (
        <SetEmailStep
          firstName={firstName}
          lastName={lastName}
          password={password}
          onNext={handleLogin}
        />
      )}
    </main>
  );
};

export default Login;
