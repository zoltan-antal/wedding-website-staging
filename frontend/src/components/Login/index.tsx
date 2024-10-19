import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import householdService from '../../services/household';
import EnterNameStep from './EnterNameStep';
import EnterPasswordStep from './EnterPasswordStep';
import CreatePasswordStep from './CreatePasswordStep';
import SetEmailStep from './SetEmailStep';
import './index.css';

const Login = () => {
  const [step, setStep] = useState<
    'enter-name' | 'enter-password' | 'create-password' | 'set-email'
  >('enter-name');
  const { language, guest, setGuest, setHousehold } =
    useOutletContext<Context>();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [hasEmail, setHasEmail] = useState<boolean>(true);

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
    hasPassword: boolean,
    hasEmail: boolean
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    if (!hasEmail) {
      setHasEmail(false);
    }
    if (hasPassword) {
      setStep('enter-password');
    } else {
      setStep('create-password');
    }
  };

  const handleLogin = async () => {
    const guestData = await guestService.me();
    setGuest(guestData);
    const householdData = await householdService.me();
    setHousehold(householdData);
    if (!hasEmail) {
      setStep('set-email');
    } else {
      navigate(queryParams.get('redirectTo') || '/');
    }
  };

  const handleEmailSet = () => {
    setHasEmail(true);
    navigate(queryParams.get('redirectTo') || '/');
  };

  return (
    <main id="login-page">
      <h1>
        {
          {
            English: 'Guest login',
            Hungarian: 'Vendég bejelentkezés',
          }[language]
        }
      </h1>
      <div className="form-wrapper">
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
            onNext={handleLogin}
          />
        )}
        {step === 'set-email' && (
          <SetEmailStep
            firstName={firstName}
            lastName={lastName}
            onNext={handleEmailSet}
          />
        )}
      </div>
    </main>
  );
};

export default Login;
