import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './index.css';

const Account = () => {
  const { language, guest } = useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest) {
      navigate('/');
    }
  }, [guest, navigate]);

  return (
    <main className="account-page">
      <h1>
        {
          {
            English: 'Guest account',
            Hungarian: 'Vendég fiók',
          }[language]
        }
      </h1>
      <h2>
        {
          {
            English: 'Settings',
            Hungarian: 'Beállítások',
          }[language]
        }
      </h2>
      <NavLink to="/change-password">
        {
          {
            English: 'Change password',
            Hungarian: 'Jelszóváltoztatás',
          }[language]
        }
      </NavLink>
      <NavLink to="/change-email">
        {
          {
            English: 'Change email address',
            Hungarian: 'E-mail cím változtatás',
          }[language]
        }
      </NavLink>
    </main>
  );
};

export default Account;
