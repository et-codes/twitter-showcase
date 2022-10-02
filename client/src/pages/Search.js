import axios from 'axios';
import { useState } from 'react';
import { SearchBar, Tweet } from '../components';
import '../styles/Search.css';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search) {
      setError('Please enter something to search for!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    getResults();
  }

  const getResults = async () => {
    try {
      const encodedSearch = encodeURI(search);
      const url = `http://localhost:5000/api/tweets/${encodedSearch}`;
      const resp = await axios.get(url);
      setResponse(resp.data);
      console.log(response);
      setSearch('');
      setSearched(true);
    } catch (err) {
      setError(`Twitter server error: ${err.message}`);
      setTimeout(() => setError(''), 5000);
      setResponse('');
    }
  }

  const getUser = (author_id) => {
    return response.users.find(user => user.id === author_id);
  }

  const getMediaUrls = (tweet) => {
    const mediaUrlList = [];
    if (tweet.attachments) {
      const mediaKeys = tweet.attachments.media_keys;
      mediaKeys.forEach(key => {
        const mediaObject = response.media.find(obj => obj.media_key === key);
        if (mediaObject.type === 'photo') {
          mediaUrlList.push(mediaObject.url);
        } else {
          mediaUrlList.push(mediaObject.preview_image_url);
        }
      });
    }
    return mediaUrlList;
  }

  const createTweetList = () => {
    const tweetsList = [];
    if (response.tweets) {
      response.tweets.forEach(tweet => {
        const user = getUser(tweet.author_id);
        const mediaUrls = getMediaUrls(tweet);
        tweetsList.push(
          <Tweet key={tweet.id} tweet={tweet} user={user} mediaUrls={mediaUrls} />
        );
      });
    } else {
      if (searched) tweetsList.push(<p key={-1}>No results found.</p>);
    }
    return tweetsList;
  }

  const tweetsToDisplay = createTweetList();

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