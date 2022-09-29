import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/Random.css';

const Random = () => {
  const userList = [
    'mikeslessons',
    'davewecklmusic',
    'JostNickel',
    'AntonioDrumsX',
    'copelandmusic'
  ];
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getResults = async () => {
      try {
        const users = userList.join(',');
        const url = `http://localhost:5000/api/userdata/${users}`;
        const resp = await axios.get(url);
        setResponse(resp.data);
      } catch (err) {
        setError(`Twitter server error: ${err.message}`);
        setTimeout(() => setError(''), 5000);
      }
    }
    getResults();
  }, []);

  console.log(response);

  return (
    <div className="Page Random">
      <h1>Random Tweet</h1>
      <p>...from a hand-picked selection of Twits...</p>
      <p><em>Coming soon!</em></p>
    </div>
  );
}

export default Random;