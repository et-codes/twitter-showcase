import axios from 'axios';
import { useState } from 'react';
import { SearchBar, Tweet } from '../components';

const Search = () => {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (search === '') {
      setError('Please enter something to search for!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const fetchedData = await axios.get(`http://localhost:5000/api/${search}`);
    setResponse(fetchedData.data);
    setSearch('');
  }

  const tweetsToDisplay = [];
  const count = response.count;
  if (count > 0) {
    const tweets = response.tweets;
    const users = response.users;
    tweets.forEach(tweet => {
      const user = users.find(user => user.id === tweet.author_id);
      tweetsToDisplay.push(<Tweet key={tweet.id} tweet={tweet} user={user} />);
    });
  }
  if (count === -1) {
    tweetsToDisplay.push(<p className="error" key={-1}>No results found.</p>);
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