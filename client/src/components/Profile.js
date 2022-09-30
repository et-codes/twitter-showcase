import { ProfileHeader } from './';
import '../styles/Profile.css';

const Profile = ({ profile, onClick }) => {
  return (
    <div className="Profile" onClick={() => onClick(profile.id)}>
      <ProfileHeader user={profile} />
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;