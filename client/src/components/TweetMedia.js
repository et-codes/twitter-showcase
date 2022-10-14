const TweetMedia = ({ mediaUrls }) => {
  return mediaUrls.map(url => {
    return (
      <img
        key={Math.random()}
        className="Tweet-image"
        src={url}
        alt="Tweet media"
      />
    );
  });
}

export default TweetMedia;