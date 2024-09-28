import { useNavigate, NavLink } from 'react-router-dom';
import './index.css';
import Nav from './Nav';
import { Language } from '../../types/language';
import { Guest } from '../../types/guest';
import authService from '../../services/auth';

interface HeaderProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
}

const Header = ({ language, setLanguage, guest, setGuest }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="title">
        <h1 className="names">
          Ella{' '}
          <span className="ampersand">
            {{ English: '&', Hungarian: 'és' }[language]}
          </span>{' '}
          Zoltán
        </h1>
        <h2 className="date">
          {
            {
              English: '19th July 2025',
              Hungarian: '2025. július 19.',
            }[language]
          }
        </h2>
      </div>
      <Nav language={language}></Nav>
      <div className="language">
        {language === 'English' && (
          <button
            onClick={() => {
              setLanguage('Hungarian');
              localStorage.setItem('EllaZoltanLanguage', 'Hungarian');
            }}
          >
            magyar
          </button>
        )}
        {language === 'Hungarian' && (
          <button
            onClick={() => {
              setLanguage('English');
              localStorage.setItem('EllaZoltanLanguage', 'English');
            }}
          >
            English
          </button>
        )}
      </div>
      <div className="account-buttons">
        {guest && (
          <>
            <NavLink to="account">
              {
                {
                  English: 'Account',
                  Hungarian: 'Fiók',
                }[language]
              }
            </NavLink>
            <button
              onClick={async () => {
                await authService.logout();
                setGuest(null);
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
          </>
        )}
        {!guest && (
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            {
              {
                English: 'Guest login',
                Hungarian: 'Vendég bejelentkezés',
              }[language]
            }
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
