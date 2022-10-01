import axios from 'axios';
import { useState, useEffect } from 'react';
import { Profile, Tweet } from '../components';
import '../styles/Random.css';

const Random = () => {
  const [profileData, setProfileData] = useState('');
  const [profileList, setProfileList] = useState([]);
  const [tweet, setTweet] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const users = 'davewecklmusic,JostNickel,AntonioDrumsX,copelandmusic,mikeslessons';
        const url = `http://localhost:5000/api/userdata/${users}&user.fields=id,name,username,description,profile_image_url,verified`;
        const resp = await axios.get(url);
        setProfileData(resp.data);
      } catch (err) {
        setError(`Twitter server error: ${err.message}`);
        setTimeout(() => setError(''), 5000);
      }
    }
    getProfiles();
  }, []);

  useEffect(() => {
    const profiles = [];
    if (profileData !== '') {
      profileData.forEach(profile => {
        profiles.push(
          <Profile key={profile.id} profile={profile} onClick={getRandomTweetId} />
        );
      });
    }
    setProfileList(profiles);
  }, [profileData]);

  const getRandomTweetId = async (id) => {
    try {
      const url = `http://localhost:5000/api/timeline/${id}`;
      const resp = await axios.get(url);
      const index = Math.floor(Math.random() * resp.data.length);
      const tweetId = resp.data[index].id;
      getTweet(tweetId);
    } catch (err) {
      setError(`Twitter server error: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    }
  }

  const getTweet = async (id) => {
    try {
      const url = `http://localhost:5000/api/tweet/${id}`;
      const resp = await axios.get(url);
      createTweet(resp.data);
    } catch (err) {
      setError(`Twitter server error: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    }
  }

  const createTweet = (data) => {
    // Need to move supporting functions into Tweet component.
    // getUser and getMediaUrls
    console.log(data);
  }

  return (
    <div className="Page Random">
      <span className="error">{error}</span>
      <h2>Click on one of my favorite drummers for a random Tweet!</h2>
      {profileList}
      {tweet}
    </div>
  );
}

export default Random;