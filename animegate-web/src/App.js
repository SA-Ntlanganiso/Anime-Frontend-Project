import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';
import Hot from './components/Hot';
import Community from './components/Community';
import About from './components/About';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [animeData, setAnimeData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={
            <Body 
              loading={loading}
              animeData={animeData}
              setLoading={setLoading}
              setAnimeData={setAnimeData}
            />
          } />
          <Route path="/login" element={
            <Login setIsAuthenticated={setIsAuthenticated} />
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hot" element={<Hot />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;