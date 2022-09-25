import axios from 'axios';
import { useState } from 'react';
import { SearchBar, Tweet } from '../components';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!search) {
      setError('Please enter something to search for!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const encodedSearch = encodeURI(search);
      const resp = await axios.get(`http://localhost:5000/api/${encodedSearch}`);
      setResponse(resp.data);
      setSearch('');
      setSearched(true);
    } catch (err) {
      setError(`Twitter server error: ${err.message}`);
      setTimeout(() => setError(''), 5000);
      setResponse('');
    }
  }

  const getUser = (author_id) => {
    return users.find(user => user.id === author_id);
  }

  const getMediaUrls = (tweet) => {
    const mediaUrlList = [];
    if (tweet.attachments) {
      const mediaKeys = tweet.attachments.media_keys;
      mediaKeys.forEach(key => {
        const mediaObject = media.find(obj => obj.media_key === key);
        if (mediaObject.type === 'photo') {
          mediaUrlList.push(mediaObject.url);
        } else {
          mediaUrlList.push(mediaObject.preview_image_url);
        }
      });
    }
    return mediaUrlList;
  }

  const tweetsToDisplay = [];
  const tweets = response.tweets;
  const users = response.users;
  const media = response.media;

  if (response.tweets) {
    tweets.forEach(tweet => {
      const user = getUser(tweet.author_id);
      const mediaUrls = getMediaUrls(tweet);
      tweetsToDisplay.push(
        <Tweet key={tweet.id} tweet={tweet} user={user} mediaUrls={mediaUrls} />
      );
    });
  } else {
    if (searched) tweetsToDisplay.push(<p key={-1}>No results found.</p>);
  }

  return (
    <div className="Search Page">
      <h1>Search</h1>
      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        text={search}
      />
      <span className="error">{error}</span>
      {tweetsToDisplay}
    </div>
  );
}

export default Search;