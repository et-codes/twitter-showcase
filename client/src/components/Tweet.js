import { TweetHeader, TweetFooter, TweetMedia } from './';
import parseLinks from '../utils/parseLinks.js';
import '../styles/Tweet.css';

const Tweet = ({ tweet, user, mediaUrls }) => {
  const tweetText = parseLinks(tweet);

  return (
    <div className="Tweet">
      <TweetHeader tweet={tweet} user={user} />
      <p>{tweetText}</p>
      <TweetMedia mediaUrls={mediaUrls} />
      <TweetFooter tweet={tweet} />
    </div>
  );
}

export default Tweet;