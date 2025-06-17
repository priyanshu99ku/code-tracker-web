import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileNavbar from './ProfileNavbar';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <>
            <Navbar />
            <div className="min-h-[80vh]">
              <Home />
            </div>
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <ProfileNavbar />
            <Profile />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
