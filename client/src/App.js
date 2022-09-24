import './styles/App.css';
import { Header, Footer } from './components';
import { Home, Search, Random, NotFound } from './pages';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/random" element={<Random />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
