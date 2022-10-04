import { ProfileHeader } from './';
import externalLink from '../assets/external-link.png';

const TweetHeader = ({ tweet, user }) => {
  const tweetUrl = `https://twitter.com/${user.username}/status/${tweet.id}`;

  return (
    <div className="Tweet-header">
      <ProfileHeader user={user} />
      <a
        className="Tweet-link"
        href={tweetUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img src={externalLink} alt="link to Tweet" />
      </a>
    </div>
  );
}

export default TweetHeader;