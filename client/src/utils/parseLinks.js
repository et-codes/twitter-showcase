const parseLinks = (tweet) => {
  const getKey = () => Math.random();

  const text = [];
  let index = 0;

  if (tweet.entities && tweet.entities.urls) {
    const urls = tweet.entities.urls;

    urls.forEach(urlObj => {
      const start = tweet.text.search(urlObj.url);

      text.push(
        <span key={getKey()}>
          {tweet.text.slice(index, start)}
        </span>
      );

      text.push(
        <span key={getKey()}>
          <a href={urlObj.url} target="_blank" rel="noreferrer">
            {urlObj.url}
          </a>
        </span>
      );

      index = start + urlObj.url.length;
    });
  };

  text.push(<span key={getKey()}>{tweet.text.slice(index)}</span>);

  return text;
}

export default parseLinks;