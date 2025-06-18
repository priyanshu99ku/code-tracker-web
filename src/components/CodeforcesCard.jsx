import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const CodeforcesCard = ({ codeforcesData }) => {
  if (!codeforcesData) {
    return <div className="text-center text-gray-500">No Codeforces data available.</div>;
  }

  const { 
    handle, 
    avatar, 
    rank, 
    rating, 
    maxRating, 
    contribution,
    lastOnlineTimeSeconds
  } = codeforcesData;

  const lastOnline = new Date(lastOnlineTimeSeconds * 1000).toLocaleDateString();

  const ratingData = [
    {
      name: 'Rating',
      uv: rating,
      pv: maxRating,
      fill: '#8884d8',
    },
  ];

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-6 max-w-4xl mx-auto h-full flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <img src={avatar} alt={`${handle}'s avatar`} className="w-20 h-20 rounded-full mr-6 border-4 border-gray-700" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{handle}</h2>
          <p className="text-gray-600">Codeforces Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{rating || 'N/A'}</p>
            <p className="text-gray-600">Current Rating</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{maxRating || 'N/A'}</p>
            <p className="text-gray-600">Max Rating</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-xl font-semibold capitalize text-gray-800">{rank || 'N/A'}</p>
            <p className="text-gray-600">Rank</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{contribution}</p>
            <p className="text-gray-600">Contribution</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Rating Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="20%" 
              outerRadius="80%" 
              barSize={20} 
              data={[{ value: rating, fill: '#82ca9d' }]} 
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
              />
              <Tooltip />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold">
                {`${rating}`}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-500 mt-2">Max Rating: {maxRating}</p>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Last online: {lastOnline}</p>
      </div>
    </div>
  );
};

export default CodeforcesCard;
