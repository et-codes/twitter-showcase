const TweetFooter = ({ tweet }) => {
  const date = new Date(tweet.created_at);
  const timeString = date.toLocaleTimeString('en-US', { timeStyle: "short" });
  const dateString = date.toLocaleDateString('en-US', { dateStyle: "medium" });

  return (
    <div className="Tweet-footer">
      <div>
        <span>
          {timeString} · {dateString} · {tweet.source}
        </span>
      </div>
      <div className="Tweet-metrics">
        <span className="Tweet-metric">
          <span className="Tweet-metric-number">
            {tweet.public_metrics.retweet_count}&nbsp;
          </span>
          Retweets
        </span>
        <span className="Tweet-metric">
          <span className="Tweet-metric-number">
            {tweet.public_metrics.quote_count}&nbsp;
          </span>
          Quote Tweets
        </span>
        <span className="Tweet-metric">
          <span className="Tweet-metric-number">
            {tweet.public_metrics.like_count}&nbsp;
          </span>
          Likes
        </span>
      </div>
    </div>
  );
}

export default TweetFooter;