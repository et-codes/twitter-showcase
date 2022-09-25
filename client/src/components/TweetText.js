const TweetText = ({ tweet }) => {
  const text = [];
  let index = 0;
  if (tweet.entities && tweet.entities.urls) {
    const urls = tweet.entities.urls;
    urls.forEach(urlObj => {
      const start = tweet.text.search(urlObj.url);

      text.push(
        <span key={Date().now}>
          {tweet.text.slice(index, start)}
        </span>
      );

      text.push(
        <span key={Date().now}>
          <a href={urlObj.url} target="_blank" rel="noreferrer">
            {urlObj.url}
          </a>
        </span>
      );

      index = start + urlObj.url.length;
    });
  };

  text.push(<span key={Date().now}>{tweet.text.slice(index)}</span>);

  return (
    <p>{text}</p>
  );
}

export default TweetText;