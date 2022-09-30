import verifiedLogo from '../assets/verified.svg';
import '../styles/ProfileHeader.css';

const ProfileHeader = ({ user }) => {
  const verifiedImg =
    <img className="verifiedLogo" src={verifiedLogo} alt="verified" />;

  return (
    <div className="Profile-header">
      <img
        className="Profile-profile"
        src={user.profile_image_url}
        alt="profile"
      />
      <div className="Profile-userinfo">
        <span className="Profile-user">
          {user.name} {user.verified && verifiedImg}
        </span><br />
        <span className="Profile-username">
          @{user.username}
        </span>
      </div>
    </div>
  );
}

export default ProfileHeader;