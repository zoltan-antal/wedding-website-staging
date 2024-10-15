import { Language } from '../../types/language';

interface LanguageButtonProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  onClick?: (e: React.MouseEvent<HTMLUListElement>) => void;
}

const LanguageButton = ({
  language,
  setLanguage,
  onClick,
}: LanguageButtonProps) => {
  return (
    <ul className="language-button" onClick={onClick}>
      <li>
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
      </li>
    </ul>
  );
};

export default LanguageButton;
