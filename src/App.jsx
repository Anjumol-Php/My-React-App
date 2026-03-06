import { Routes, Route, Link } from 'react-router-dom';
import Weather from './Weather';
import UserManager from './UserManager'; // 👈 Ithu import cheythittundel maathrame app work aaku!

function App() {
  return (
    <div className="main-app">
      <nav className="navbar">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/weather" className="nav-link">🌤️ Weather</Link>
        <Link to="/users" className="nav-link">👥 Users</Link>
      </nav>

      <div className="page-container">
        <Routes>
        {/* path="/" kodukkumpol Weather component thurakkum */}
        <Route path="/" element={<Weather />} /> 
        <Route path="/weather" element={<Weather />} />
        <Route path="/users" element={<UserManager />} /> 
      </Routes>
      </div>
    </div>
  );
}

export default App;