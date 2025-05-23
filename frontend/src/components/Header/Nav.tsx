import { NavLink } from 'react-router-dom';
import { Language } from '../../types/language';
import { Guest } from '../../types/guest';
import { Household } from '../../types/household';
import AccountButtons from './AccountButtons';
import LanguageButton from './LanguageButton';
import './Nav.css';

interface NavProps {
  mobileView: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  guest: Guest | null;
  setGuest: React.Dispatch<React.SetStateAction<Guest | null>>;
  setHousehold: React.Dispatch<React.SetStateAction<Household | null>>;
  navRef: React.MutableRefObject<HTMLElement | null>;
}

const Nav = ({
  mobileView,
  menuOpen,
  setMenuOpen,
  language,
  setLanguage,
  guest,
  setGuest,
  setHousehold,
  navRef,
}: NavProps) => {
  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!mobileView) {
      return;
    }

    const target = e.target as HTMLElement;
    const link = target.closest('a') || target.closest('button');
    if (link) {
      setMenuOpen(false);
    }
  };

  return (
    <nav ref={navRef} className={menuOpen ? 'open' : 'closed'}>
      <ul className="nav-links" onClick={handleMenuClick}>
        <li>
          <NavLink to="/">
            {
              {
                English: 'Home',
                Hungarian: 'Főoldal',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/venue">
            {
              {
                English: 'Venue',
                Hungarian: 'Helyszín',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/accommodation">
            {
              {
                English: 'Accommodation',
                Hungarian: 'Szállás',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/travel">
            {
              {
                English: 'Travel',
                Hungarian: 'Érkezés',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedule">
            {
              {
                English: 'Schedule',
                Hungarian: 'Program',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/dress-code">
            {
              {
                English: 'Dress Code',
                Hungarian: 'Dress code',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/gifts">
            {
              {
                English: 'Gifts',
                Hungarian: 'Ajándékozás',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/post-wedding">
            {
              {
                English: 'Post-wedding',
                Hungarian: 'Esküvő után',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq">
            {
              {
                English: 'FAQ',
                Hungarian: 'GYIK',
              }[language]
            }
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            {
              {
                English: 'Contact',
                Hungarian: 'Kapcsolat',
              }[language]
            }
          </NavLink>
        </li>
      </ul>
      <AccountButtons
        language={language}
        guest={guest}
        setGuest={setGuest}
        setHousehold={setHousehold}
        onClick={handleMenuClick}
      />
      <LanguageButton
        language={language}
        setLanguage={setLanguage}
        onClick={handleMenuClick}
      />
    </nav>
  );
};

export default Nav;
