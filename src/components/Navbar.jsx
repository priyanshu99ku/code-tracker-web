import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-950 py-3 px-4 flex justify-between items-center shadow-md">
      <Link to="/home" className="text-white text-2xl font-bold">CodeTracker</Link>
      <div>
        <a href="#home" className="text-white mx-2 hover:underline">Home</a>
        <a href="#contest" className="text-white mx-2 hover:underline">Contest</a>
        <a href="#feedback" className="text-white mx-2 hover:underline">Feedback</a>
        <a href="#critique" className="text-white mx-2 hover:underline">Critique</a>
        <Link to="/profile" className="text-white mx-2 hover:underline">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
