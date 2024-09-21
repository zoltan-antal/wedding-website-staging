import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';

const Account = () => {
  const { language, guest } = useOutletContext<Context>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!guest) {
      navigate('/');
    }
  }, [guest, navigate]);

  return (
    <main>
      <h1>
        {
          {
            English: 'Guest account settings',
            Hungarian: 'Vendég fiók beállítások',
          }[language]
        }
      </h1>
      <NavLink to="/change-password">
        {
          {
            English: 'Change password',
            Hungarian: 'Jelszóváltoztatás',
          }[language]
        }
      </NavLink>
    </main>
  );
};

export default Account;
