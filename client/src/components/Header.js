import { Link } from 'react-router-dom';
import '../styles/HeaderFooter.css';

const Header = () => {
  return (
    <nav className="Header">
      <span className="Header-title">Twitter Showcase</span>
      <div className="Header-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/random">Random Tweet</Link>
      </div>
    </nav>
  );
}

export default Header;