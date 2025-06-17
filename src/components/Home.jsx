import React from 'react';
import { useSelector } from 'react-redux';
import { FaCode } from 'react-icons/fa';
import ContestSection from './ContestSection';
import FeedbackSection from './FeedbackSection';
import CritiqueSection from './CritiqueSection';

const Home = () => {
  const user = useSelector(state => state.user.user);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">

      {user && (
        <div className="p-4 rounded bg-white shadow text-center">
          <h2 className="text-xl font-semibold">Hello, {user.name || user.email || 'User'}!</h2>
        
        </div>
      )}
      <div id="home" className="flex flex-col items-center justify-center bg-green-100 rounded-xl shadow-lg p-8 max-w-2xl w-full mb-8 mt-8">
        <FaCode className="text-blue-950 text-6xl mb-4" />
        <h1 className="text-4xl font-extrabold text-blue-950 mb-2 text-center">Code Tracker</h1>
        <p className="text-lg text-gray-700 text-center mb-2">
          Seamlessly manage your coding profiles across platforms.<br />
          Track progress, ratings, and problems—all in one place.
        </p>
      </div>
      <ContestSection />
      <FeedbackSection />
      <CritiqueSection />
      
    </div>
  );
};

export default Home;
