import './Nav.css';
import { NavLink } from 'react-router-dom';
import { Language } from '../../types/language';

interface NavProps {
  language: Language;
  navRef: React.MutableRefObject<HTMLElement | null>;
}

const Nav = ({ language, navRef }: NavProps) => {
  return (
    <nav ref={navRef}>
      <ul>
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
        <li style={{ display: 'none' }}>
          <NavLink to="/registry">
            {
              {
                English: 'Registry',
                Hungarian: 'Ajándéklista',
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
        <li>
          <NavLink to="/rsvp">
            {
              {
                English: 'RSVP',
                Hungarian: 'Visszajelzés',
              }[language]
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
