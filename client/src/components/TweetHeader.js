import verifiedLogo from '../assets/verified.svg';
import externalLink from '../assets/external-link.png';

const TweetHeader = ({ tweet, user }) => {
  const verifiedImg =
    <img className="verifiedLogo" src={verifiedLogo} alt="verified" />;

  const tweetUrl = `https://twitter.com/${user.username}/status/${tweet.id}`;

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