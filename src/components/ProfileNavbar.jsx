import React from 'react';
import { Link } from 'react-router-dom';

const ProfileNavbar = () => (
  <nav className="w-full bg-blue-950 py-3 px-4 flex justify-between items-center shadow-md">
    <Link to="/home" className="text-white text-2xl font-bold">Home</Link>
    <span className="text-white text-2xl font-bold">Profile</span>
  </nav>
);

export default ProfileNavbar;
