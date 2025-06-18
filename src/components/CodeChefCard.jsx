import React from 'react';

const CodeChefCard = ({ codechefData }) => {
  if (!codechefData) {
    return <div className="text-center text-gray-500">No CodeChef data available.</div>;
  }

  const {
    username,
    rating,
    rating_number,
    country,
    global_rank,
    country_rank,
    user_type,
    institution,
    organisation,
    max_rank,
  } = codechefData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto h-full flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold mr-6 border-4 border-orange-600">
          {username ? username.charAt(0).toUpperCase() : '?'}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{username || 'N/A'}</h2>
          <p className="text-gray-600">CodeChef Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-orange-800">{rating || 'N/A'}</p>
          <p className="text-gray-600">Stars</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-orange-800">{rating_number || 'N/A'}</p>
          <p className="text-gray-600">Current Rating</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-orange-800">{max_rank || 'N/A'}</p>
          <p className="text-gray-600">Max Rating</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-orange-800">{global_rank || 'N/A'}</p>
          <p className="text-gray-600">Global Rank</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Country:</span>
          <span className="text-gray-800">{country || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Country Rank:</span>
          <span className="text-gray-800">{country_rank || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">User Type:</span>
          <span className="text-gray-800">{user_type || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Institution:</span>
          <span className="text-gray-800">{institution || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Organization:</span>
          <span className="text-gray-800">{organisation || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeChefCard;
