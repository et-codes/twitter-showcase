import { TweetHeader, TweetFooter } from './';
import '../styles/Tweet.css';

const Tweet = ({ tweet, user }) => {
  return (
    <div className="Tweet">
      <TweetHeader tweet={tweet} user={user} />
      <p>{tweet.text}</p>
      <TweetFooter tweet={tweet} />
    </div>
  );
}

export default Tweet;