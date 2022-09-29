import { TweetHeader, TweetFooter } from './';
import parseLinks from '../utils/parseLinks.js';
import '../styles/Tweet.css';

const Tweet = ({ tweet, user, mediaUrls }) => {
  const media = [];
  mediaUrls.forEach(url => {
    media.push(
      <img
        key={url}
        className="Tweet-image"
        src={url}
        alt="Tweet media"
      />
    );
  });

  const tweetText = parseLinks(tweet);

  return (
    <div className="Tweet">
      <TweetHeader tweet={tweet} user={user} />
      <p>{tweetText}</p>
      {media}
      <TweetFooter tweet={tweet} />
    </div>
  );
}

export default Tweet;