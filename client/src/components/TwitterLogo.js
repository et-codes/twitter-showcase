import twitterLogo from '../assets/Logo blue.svg';
import '../styles/TwitterLogo.css';

const TwitterLogo = ({ width }) => {
  return (
    <div>
      <img
        className="Twitter-logo"
        src={twitterLogo}
        alt="Twitter logo"
        width={width || '100%'}
      />
      <p className="Twitter-logo-caption">Isn't this thing creepy?</p>
    </div>
  );
}

export default TwitterLogo;