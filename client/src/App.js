import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ZikirPage from './pages/Zikir';
import LeaderboardPage from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import StatsPage from './pages/Stats';

function App() {
  // localStorage'da kullanıcı bilgisi var mı diye kontrol et
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/stats/:encodedData" element={<StatsPage />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <ZikirPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
