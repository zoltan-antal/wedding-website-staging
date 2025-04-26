import { Language } from '../../types/language';
import { Guest } from '../../types/guest';
import { Household } from '../../types/household';
import menuIcon from '../../assets/images/icons/menu.svg';
import Nav from './Nav';
import AccountButtons from './AccountButtons';
import LanguageButton from './LanguageButton';
import './Header.css';
import leafImage from '../../assets/images/graphics/leaf.webp';

interface HeaderProps {
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

const Header = ({
  mobileView,
  menuOpen,
  setMenuOpen,
  language,
  setLanguage,
  guest,
  setGuest,
  setHousehold,
  navRef,
}: HeaderProps) => {
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <div className="title">
        <button className="menu-button" onClick={toggleMenu}>
          <img src={menuIcon} />
        </button>
        <img src={leafImage} id="leaf-left" />
        <img src={leafImage} id="leaf-right" />
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
      <Nav
        mobileView={mobileView}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        language={language}
        setLanguage={setLanguage}
        guest={guest}
        setGuest={setGuest}
        setHousehold={setHousehold}
        navRef={navRef}
      />
      <LanguageButton language={language} setLanguage={setLanguage} />
      <AccountButtons
        language={language}
        guest={guest}
        setGuest={setGuest}
        setHousehold={setHousehold}
      />
    </header>
  );
};

export default Header;
