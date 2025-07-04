import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Dashboard from './Dashboard';
import Discussion from './Discussion';
import Problems from './Problems';

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
            <Navbar />
            <div className="min-h-[80vh]">
              <Profile />
            </div>
            <Footer />
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Navbar />
            <div className="min-h-[80vh]">
              <Dashboard />
            </div>
            <Footer />
          </>
        } />
        <Route path="/edit-profile" element={
          <>
            <Navbar />
            <div className="min-h-[80vh]">
              <EditProfile />
            </div>
            <Footer />
          </>
        } />
        <Route path="/discussion" element={
          <>
            <Navbar />
            <div className="min-h-[80vh]">
              <Discussion />
            </div>
            <Footer />
          </>
        } />
              <Route path="/problems" element={
          <>
            <Navbar />
            <div className="min-h-[80vh]">
              <Problems />
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
