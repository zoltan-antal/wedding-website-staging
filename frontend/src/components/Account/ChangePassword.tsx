import { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import guestService from '../../services/guest';

const ChangePassword = () => {
  const { language, guest } = useOutletContext<Context>();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] =
    useState<boolean>(false);

  const currentPasswordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPasswordInputRef.current) {
      currentPasswordInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!guest) {
      navigate('/');
    }
  }, [guest, navigate]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage(
          {
            English: 'Passwords do not match',
            Hungarian: 'A jelszavak nem egyeznek',
          }[language]
        );
        return;
      }
      if (newPassword === currentPassword) {
        setErrorMessage(
          {
            English: "New password can't be the same as current password",
            Hungarian: 'Az új jelszó nem egyezhet meg a jelenlegivel',
          }[language]
        );
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage(
          {
            English: 'New password must be at least 6 characters long',
            Hungarian:
              'Az új jelszónak minimum 6 karakter hosszúnak kell lennie',
          }[language]
        );
        return;
      }
      setButtonDisabled(true);
      setErrorMessage('');
      await guestService.changePassword(
        guest!.firstName,
        guest!.lastName,
        currentPassword,
        newPassword
      );
      setPasswordChangeSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      setErrorMessage(
        {
          English: 'Invalid current password',
          Hungarian: 'Helytelen jelenlegi jelszó',
        }[language]
      );
      setButtonDisabled(false);
    }
  };

  return (
    <main id="change-password-page">
      <h1>
        {
          {
            English: 'Change password',
            Hungarian: 'Jelszóváltoztatás',
          }[language]
        }
      </h1>
      <div className="form-wrapper">
        {!passwordChangeSuccess && (
          <form onSubmit={handleChangePassword}>
            <label>
              {
                {
                  English: 'Current password',
                  Hungarian: 'Jelenlegi jelszó',
                }[language]
              }
              <input
                ref={currentPasswordInputRef}
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              {
                {
                  English: 'New password',
                  Hungarian: 'Új jelszó',
                }[language]
              }
              <input
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              {
                {
                  English: 'Confirm new password',
                  Hungarian: 'Új jelszó újra',
                }[language]
              }
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button type="submit" disabled={buttonDisabled}>
              {
                {
                  English: 'Change password',
                  Hungarian: 'Jelszó megváltoztatása',
                }[language]
              }
            </button>
            <p>{errorMessage}</p>
          </form>
        )}
        {passwordChangeSuccess && (
          <h2>
            {
              {
                English: 'Password changed successfully!',
                Hungarian: 'Jelszó sikeresen megváltoztatva!',
              }[language]
            }
          </h2>
        )}
      </div>
    </main>
  );
};

export default ChangePassword;
