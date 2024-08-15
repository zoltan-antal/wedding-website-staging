import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/location">Location</NavLink>
        </li>
        <li>
          <NavLink to="/travel">Travel</NavLink>
        </li>
        <li>
          <NavLink to="/schedule">Schedule</NavLink>
        </li>
        <li>
          <NavLink to="/registry">Registry</NavLink>
        </li>
        <li>
          <NavLink to="/faq">FAQ</NavLink>
        </li>
        <li>
          <NavLink to="/rsvp">RSVP</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
