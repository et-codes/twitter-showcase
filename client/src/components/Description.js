import '../styles/Description.css';
import { Link } from 'react-router-dom';

function Description() {
  return (
    <div className="Description">
      <h2>What is this?</h2>
      <p>
        Twitter can be sooo weird and confusing, right?  All those Twits in the same place - scary!  And what does this terrifying blue bird eat, anyway?  Thoughts? PEOPLE?!?!
      </p>
      <p>
        Wouldn't it be great if there was a website that could keep Twitter at a comfortable distance, yet still allow you to take a peek at what's going on over there?
      </p>
      <h1>My friend, you are in luck!</h1>
      <p>
        I created this website just for wise, cautious people like you!
      </p>
      <p>
        Use the <Link to="/search" className="Description-link">Search</Link> page to search for a selection of Tweets related to your topics of interest.
      </p>
      <p>
        Go to the <Link to="/random" className="Description-link">Random Tweet</Link> area to see a random Tweet from a carefully curated list of Twitter users that are almost guaranteed not to alarm you!
      </p>
    </div>
  );
}

export default Description;