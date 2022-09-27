import '../styles/Home.css';
import { Description, TwitterLogo } from '../components';

const Home = () => {
  return (
    <div className="Home Page">
      <Description />
      <TwitterLogo width={'75%'} />
    </div>
  );
}

export default Home;