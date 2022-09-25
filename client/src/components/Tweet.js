import { TweetHeader, TweetFooter } from './';
import '../styles/Tweet.css';

const Tweet = ({ tweet, user, mediaUrls }) => {
  const media = [];
  mediaUrls.forEach(url => {
    media.push(
      <img
        key={Date().now}
        className="Tweet-image"
        src={url}
        alt="Tweet media"
      />
    );
  });

  return (
    <div className="Tweet">
      <TweetHeader tweet={tweet} user={user} />
      <p>{tweet.text}</p>
      {media}
      <TweetFooter tweet={tweet} />
    </div>
  );
}

export default Tweet;