import { ProfileHeader } from './';

const Profile = ({ profile }) => {
  return (
    <div className="Profile">
      <ProfileHeader user={profile} />
    </div>
  );
}

export default Profile;