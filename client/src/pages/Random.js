import axios from 'axios';
import { useState, useEffect } from 'react';
import { Profile } from '../components';
import '../styles/Random.css';

const Random = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const users = 'mikeslessons,davewecklmusic,JostNickel,AntonioDrumsX,copelandmusic';
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
      <h2>Select one of my favorite drummers for a random Tweet!</h2>
      {profileList}
    </div>
  );
}

export default Random;