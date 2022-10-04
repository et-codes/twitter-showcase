import { Description, TwitterLogo } from '../components';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="Home Page">
      <Description />
      <TwitterLogo width={'75%'} />
    </div>
  );
}

export default Home;