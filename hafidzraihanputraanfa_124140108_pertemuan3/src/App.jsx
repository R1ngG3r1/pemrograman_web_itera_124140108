import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Beranda</Link>
        <Link to="/stats">Statistik</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </>
  );
}

export default App;