import axios from 'axios';
import { useState, useEffect } from 'react';
import { Profile } from '../components';
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
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const users = userList.join(',');
        const url = `http://localhost:5000/api/userdata/${users}&user.fields=id,name,username,description,profile_image_url,verified`;
        const resp = await axios.get(url);
        setResponse(resp.data);
      } catch (err) {
        setError(`Twitter server error: ${err.message}`);
        setTimeout(() => setError(''), 5000);
      }
    }
    getResults();
  }, []);

  useEffect(() => {
    const profiles = [];
    if (response !== '') {
      response.forEach(profile => {
        profiles.push(
          <Profile key={profile.id} profile={profile} />
        );
      });
    }
    setProfileList(profiles);
  }, [response]);

  return (
    <div className="Page Random">
      <span className="error">{error}</span>
      <h1>Random Tweet</h1>
      {profileList}
    </div>
  );
}

export default Random;