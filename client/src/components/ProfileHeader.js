import verifiedLogo from '../assets/verified.svg';
import '../styles/Tweet.css';

const ProfileHeader = ({ user }) => {
  const verifiedImg =
    <img className="verifiedLogo" src={verifiedLogo} alt="verified" />;

  return (
    <div className="Tweet-header">
      <img
        className="Tweet-profile"
        src={user.profile_image_url}
        alt="profile"
      />
      <div className="Tweet-userinfo">
        <span className="Tweet-user">
          {user.name} {user.verified && verifiedImg}
        </span><br />
        <span className="Tweet-username">
          @{user.username}
        </span>
      </div>
    </div>
  );
}

export default ProfileHeader;