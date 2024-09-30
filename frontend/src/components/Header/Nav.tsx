import './Nav.css';
import { NavLink } from 'react-router-dom';
import { Language } from '../../types/language';

interface NavProps {
  language: Language;
}

const Nav = ({ language }: NavProps) => {
  return (
    <nav>
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
          <NavLink to="/location">
            {
              {
                English: 'Location',
                Hungarian: 'Helyszín',
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
