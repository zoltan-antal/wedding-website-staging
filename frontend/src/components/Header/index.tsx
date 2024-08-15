import './index.css';
import Nav from './Nav';

const Header = () => {
  return (
    <header>
      <div className="title">
        <h1 className="names">Ella & Zoltán</h1>
        <h2 className="date">19th July 2025</h2>
      </div>
      <Nav></Nav>
    </header>
  );
};

export default Header;
