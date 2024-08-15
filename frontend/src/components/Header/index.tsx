import './index.css';
import Nav from './Nav';
import { Language } from '../../types/language';

interface HeaderProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  return (
    <header>
      <div className="title">
        <h1 className="names">Ella & Zoltán</h1>
        <h2 className="date">19th July 2025</h2>
      </div>
      <Nav></Nav>
      <div className="language">
        {language === 'English' && (
          <button onClick={() => setLanguage('Hungarian')}>magyar</button>
        )}
        {language === 'Hungarian' && (
          <button onClick={() => setLanguage('English')}>English</button>
        )}
      </div>
    </header>
  );
};

export default Header;
