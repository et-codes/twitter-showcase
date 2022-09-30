import { ProfileHeader } from './';
import '../styles/Profile.css';

const Profile = ({ profile }) => {
  return (
    <div className="Profile">
      <ProfileHeader user={profile} />
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;