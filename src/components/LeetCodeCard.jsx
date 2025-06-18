import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const LeetCodeCard = ({ leetcodeData }) => {
  if (!leetcodeData || !leetcodeData.data) {
    return <div className="text-center text-gray-500">No LeetCode data available.</div>;
  }

  const { matchedUser, userContestRanking } = leetcodeData.data;
  const {
    username,
    profile: { userAvatar },
    languageProblemCount,
    submitStats: { acSubmissionNum },
    badges,
    userCalendar: { streak, totalActiveDays },
  } = matchedUser;

  const totalSolved = acSubmissionNum.find(s => s.difficulty === 'All')?.count || 0;

  const languageData = languageProblemCount.map(lang => ({
    name: lang.languageName,
    value: lang.problemsSolved,
  }));

  const submissionData = acSubmissionNum.filter(s => s.difficulty !== 'All').map(s => ({
      name: s.difficulty,
      count: s.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <img src={userAvatar} alt={`${username}'s avatar`} className="w-20 h-20 rounded-full mr-6 border-4 border-blue-500" />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{username}</h2>
          <p className="text-gray-600">LeetCode Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-800">{totalSolved}</p>
          <p className="text-gray-600">Total Problems Solved</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-green-800">{userContestRanking?.rating.toFixed(0) || 'N/A'}</p>
          <p className="text-gray-600">Contest Rating</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-yellow-800">{streak}</p>
          <p className="text-gray-600">Current Streak</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Problems Solved by Difficulty</h3>
          <BarChart width={400} height={300} data={submissionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Languages Used</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={languageData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Badges</h3>
        <div className="flex flex-wrap gap-4">
          {badges.slice(0, 5).map((badge, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {badge.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeCard;
