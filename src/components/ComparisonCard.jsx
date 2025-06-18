import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonCard = ({ leetcodeData, codeforcesData, codechefData }) => {
  if (!leetcodeData || !codeforcesData || !codechefData) {
    return null; // Don't render if any data is missing
  }

  const ratingData = [
    {
      name: 'Ratings',
      LeetCode: leetcodeData.data?.userContestRanking?.rating?.toFixed(0) || 0,
      Codeforces: codeforcesData.rating || 0,
      CodeChef: codechefData.rating_number || 0,
    },
  ];

  const summaryData = [
      {
          platform: 'LeetCode',
          metric: 'Total Solved',
          value: leetcodeData.data?.matchedUser?.submitStats?.acSubmissionNum.find(s => s.difficulty === 'All')?.count || 'N/A'
      },
      {
          platform: 'Codeforces',
          metric: 'Max Rank',
          value: codeforcesData.maxRank || 'N/A'
      },
      {
          platform: 'CodeChef',
          metric: 'Global Rank',
          value: codechefData.global_rank || 'N/A'
      }
  ]

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-6 mt-8 transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Platform Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Rating Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip cursor={{fill: 'rgba(240, 240, 240, 0.5)'}}/>
              <Legend />
              <Bar dataKey="LeetCode" fill="#FFC658" name="LeetCode Contest" />
              <Bar dataKey="Codeforces" fill="#8884d8" name="Codeforces" />
              <Bar dataKey="CodeChef" fill="#FF8042" name="CodeChef" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Key Metrics</h3>
            <div className="space-y-4">
                {summaryData.map(item => (
                    <div key={item.platform} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                        <span className="font-bold text-gray-700">{item.platform}</span>
                        <span className="text-gray-600">{item.metric}:</span>
                        <span className="font-bold text-lg text-blue-800">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
