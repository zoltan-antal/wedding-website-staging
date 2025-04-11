import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';
import householdService from '../../services/household';
import EnterNameStep from './EnterNameStep';
import EnterPasswordStep from './EnterPasswordStep';
import CreatePasswordStep from './CreatePasswordStep';
import SetEmailStep from './SetEmailStep';
import './Login.css';

type RedirectTo = '/' | '/accommodation' | '/rsvp';

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
  const [redirectTo, setRedirectTo] = useState<RedirectTo>('/');

  useEffect(() => {
    if (guest) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setRedirectTo((queryParams.get('redirectTo') as RedirectTo) || '/');
  });

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
      navigate(redirectTo);
    }
  };

  const handleEmailSet = () => {
    setHasEmail(true);
    navigate(redirectTo);
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
      {redirectTo !== '/' && step === 'enter-name' && (
        <div id="login-reason">
          {(() => {
            switch (redirectTo) {
              case '/rsvp':
                return (
                  <>
                    <p>
                      {
                        {
                          English: 'Please log in to RSVP.',
                          Hungarian: 'Kérjük, jelentkezz be a visszajelzéshez.',
                        }[language]
                      }
                      <br />
                      {
                        {
                          English: 'The deadline is 15th January 2025.',
                          Hungarian: 'A határidő 2025. január 15.',
                        }[language]
                      }
                    </p>
                  </>
                );

              default:
                return (
                  <p>
                    {
                      {
                        English: 'Please log in to view this page.',
                        Hungarian:
                          'Kérjük, jelentkezz be ennek az oldalnak a megtekintéséhez.',
                      }[language]
                    }
                  </p>
                );
            }
          })()}
        </div>
      )}
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
