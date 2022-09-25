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

  const tweetsToDisplay = [];
  const tweets = response.tweets;
  const users = response.users;

  if (response.tweets) {
    tweets.forEach(tweet => {
      const user = users.find(user => user.id === tweet.author_id);
      tweetsToDisplay.push(<Tweet key={tweet.id} tweet={tweet} user={user} />);
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