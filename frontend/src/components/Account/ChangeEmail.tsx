import { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';

const ChangeEmail = () => {
  const { language, guest } = useOutletContext<Context>();

  const [newEmail, setNewEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState<boolean>(false);

  const newEmailInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (newEmailInputRef.current) {
      newEmailInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!guest) {
      navigate('/');
    }
  }, [guest, navigate]);

  const handleChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEmail !== confirmEmail) {
      setErrorMessage(
        {
          English: 'Email addresses do not match',
          Hungarian: 'Az e-mail címek nem egyeznek',
        }[language]
      );
      return;
    }
    if (
      !newEmailInputRef.current!.validity.valid ||
      !validator.isEmail(newEmail)
    ) {
      setErrorMessage(
        {
          English: 'The provided email address is invalid',
          Hungarian: 'A megadott e-mail cím érvénytelen',
        }[language]
      );
      return;
    }
    setButtonDisabled(true);
    setErrorMessage('');
    await guestService.changeEmail(guest!.firstName, guest!.lastName, newEmail);
    setEmailChangeSuccess(true);
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return (
    <main id="change-email-page">
      <h1>
        {
          {
            English: 'Change email address',
            Hungarian: 'E-mail cím változtatás',
          }[language]
        }
      </h1>
      <div className="form-wrapper">
        {!emailChangeSuccess && (
          <form onSubmit={handleChangeEmail} noValidate>
            <label>
              {
                {
                  English: 'New email address',
                  Hungarian: 'Új e-mail cím',
                }[language]
              }
              <input
                ref={newEmailInputRef}
                type="email"
                autoComplete="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
            <label>
              {
                {
                  English: 'Confirm new email address',
                  Hungarian: 'Új e-mail cím újra',
                }[language]
              }
              <input
                type="email"
                autoComplete="off"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </label>
            <button type="submit" disabled={buttonDisabled}>
              {
                {
                  English: 'Change email address',
                  Hungarian: 'E-mail cím megváltoztatása',
                }[language]
              }
            </button>
            <p>{errorMessage}</p>
          </form>
        )}
        {emailChangeSuccess && (
          <h2>
            {
              {
                English: 'Email address changed successfully!',
                Hungarian: 'E-mail cím sikeresen megváltoztatva!',
              }[language]
            }
          </h2>
        )}
      </div>
    </main>
  );
};

export default ChangeEmail;
