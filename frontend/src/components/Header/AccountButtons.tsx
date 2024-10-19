import { useNavigate, NavLink } from 'react-router-dom';
import { Language } from '../../types/language';
import { Guest } from '../../types/guest';
import { Household } from '../../types/household';
import authService from '../../services/auth';

interface AccountButtonsProps {
  language: Language;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
  setHousehold: React.Dispatch<React.SetStateAction<Household | null>>;
  onClick?: (e: React.MouseEvent<HTMLUListElement>) => void;
}

const AccountButtons = ({
  language,
  guest,
  setGuest,
  setHousehold,
  onClick,
}: AccountButtonsProps) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  return (
    <ul className="account-buttons" onClick={onClick}>
      {guest && (
        <>
          <li>
            <NavLink to="account">
              {
                {
                  English: 'Account',
                  Hungarian: 'Fiók',
                }[language]
              }
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                authService.logout();
                setGuest(null);
                setHousehold(null);
                navigate('/');
              }}
            >
              {
                {
                  English: 'Log out',
                  Hungarian: 'Kijelentkezés',
                }[language]
              }
            </button>
          </li>
        </>
      )}
      {!guest && (
        <li>
          <button
            onClick={() => {
              if (location.pathname === '/login') {
                return navigate(
                  `/login?redirectTo=${queryParams.get('redirectTo')}`
                );
              }
              return navigate(`/login?redirectTo=${location.pathname}`);
            }}
          >
            {
              {
                English: 'Guest login',
                Hungarian: 'Vendég bejelentkezés',
              }[language]
            }
          </button>
        </li>
      )}
    </ul>
  );
};

export default AccountButtons;
