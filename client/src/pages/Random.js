import axios from 'axios';
import { useState, useEffect } from 'react';
import { Profile, Tweet, RandomButton } from '../components';
import getMediaUrls from '../utils/getMediaUrls';
import '../styles/Random.css';

const Random = () => {
  const [profileData, setProfileData] = useState('');
  const [profileList, setProfileList] = useState([]);
  const [tweetToDisplay, setTweetToDisplay] = useState('');
  const [showProfiles, setShowProfiles] = useState(true);
  const [showTweet, setShowTweet] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const users = 'davewecklmusic,JostNickel,AntonioDrumsX,copelandmusic,mikeslessons';
        const url = `${process.env.REACT_APP_BACKEND}/api/userdata/${users}&user.fields=id,name,username,description,profile_image_url,verified`;
        const resp = await axios.get(url);
        setProfileData(resp.data);
      } catch (err) {
        setError(`Server error: ${err.message}`);
        setTimeout(() => setError(''), 5000);
      }
    }
    getProfiles();
  }, []);

  useEffect(() => {
    const createProfileList = () => {
      const profiles = [
        <h2 key={Math.random()}>
          Click on one of my favorite drummers for a random Tweet!
        </h2>
      ];
      if (profileData !== '') {
        profileData.forEach(profile => {
          profiles.push(
            <Profile key={profile.id} profile={profile}
              onClick={getRandomTweetId} />
          );
        });
      }
      setProfileList(profiles);
    }
    createProfileList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const getRandomTweetId = async (id) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND}/api/timeline/${id}`;
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
      const url = `${process.env.REACT_APP_BACKEND}/api/tweet/${id}`;
      const resp = await axios.get(url);
      displayTweet(resp.data);
    } catch (err) {
      setError(`Twitter server error: ${err.message}`);
      setTimeout(() => setError(''), 5000);
    }
  }

  const displayTweet = (data) => {
    const tweet = data.tweets;
    const user = data.users[0];
    const mediaUrls = getMediaUrls(tweet, data.media);
    setTweetToDisplay(
      <div>
        <Tweet key={tweet.id} tweet={tweet} user={user} mediaUrls={mediaUrls} />
        <RandomButton handleClick={searchAgain} />
      </div>
    );
    setShowProfiles(false);
    setShowTweet(true);
  }

  const searchAgain = (event) => {
    setShowTweet(false);
    setShowProfiles(true);
  }

  return (
    <div className="Page Random">
      <span className="error">{error}</span>
      {showProfiles && profileList}
      {showTweet && tweetToDisplay}
    </div>
  );
}

export default Random;