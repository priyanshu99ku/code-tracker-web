import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import LeetCodeCard from './LeetCodeCard';
import CodeforcesCard from './CodeforcesCard';
import CodeChefCard from './CodeChefCard';
import ComparisonCard from './ComparisonCard';

const Dashboard = () => {
  const { data: profile } = useSelector(state => state.profile);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [loadingLeetCode, setLoadingLeetCode] = useState(false);
  const [loadingCodeforces, setLoadingCodeforces] = useState(false);
  const [loadingCodeChef, setLoadingCodeChef] = useState(false);
  const [errorLeetCode, setErrorLeetCode] = useState('');
  const [errorCodeforces, setErrorCodeforces] = useState('');
  const [errorCodeChef, setErrorCodeChef] = useState('');

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      if (profile?.leetcode) {
        setLoadingLeetCode(true);
        setErrorLeetCode('');
        try {
          const response = await axios.get(`${API_BASE_URL}/leetcode/user/${profile.leetcode}`);
          if (response.data.success) {
            setLeetcodeData(response.data.data);
          } else {
            setErrorLeetCode(response.data.message || 'Failed to fetch LeetCode data.');
          }
        } catch (err) {
          setErrorLeetCode(err.response?.data?.message || 'An error occurred while fetching LeetCode data.');
        }
        setLoadingLeetCode(false);
      }
    };

    const fetchCodeforcesData = async () => {
      if (profile?.codeforces) {
        setLoadingCodeforces(true);
        setErrorCodeforces('');
        try {
          const response = await axios.get(`${API_BASE_URL}/codeforces/user/${profile.codeforces}`);
          if (response.data.success) {
            setCodeforcesData(response.data.data);
          } else {
            setErrorCodeforces(response.data.message || 'Failed to fetch Codeforces data.');
          }
        } catch (err) {
          setErrorCodeforces(err.response?.data?.message || 'An error occurred while fetching Codeforces data.');
        }
        setLoadingCodeforces(false);
      }
    };

    const fetchCodeChefData = async () => {
      if (profile?.codechef) {
        setLoadingCodeChef(true);
        setErrorCodeChef('');
        try {
          const response = await axios.get(`${API_BASE_URL}/codechef/user/${profile.codechef}`);
          if (response.data.success) {
            setCodechefData(response.data.data);
          } else {
            setErrorCodeChef(response.data.message || 'Failed to fetch CodeChef data.');
          }
        } catch (err) {
          setErrorCodeChef(err.response?.data?.message || 'An error occurred while fetching CodeChef data.');
        }
        setLoadingCodeChef(false);
      }
    };

    fetchLeetCodeData();
    fetchCodeforcesData();
    fetchCodeChefData();
  }, [profile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-4">Your Coding Dashboard</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">A comprehensive overview of your competitive programming profiles.</p>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          <div className="xl:col-span-2">
            {loadingLeetCode && (
              <div className="text-center p-8 bg-white rounded-lg shadow-md"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div><p className="mt-4 text-gray-600">Fetching LeetCode Stats...</p></div>
            )}
            {errorLeetCode && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">{errorLeetCode}</div>}
            {leetcodeData && <LeetCodeCard leetcodeData={leetcodeData} />}
            {!loadingLeetCode && !errorLeetCode && !leetcodeData && (
              <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md">
                <p>No LeetCode username found in your profile. Please add it to see your stats.</p>
              </div>
            )}
          </div>

          <div>
            {loadingCodeforces && (
              <div className="text-center p-8 bg-white rounded-lg shadow-md"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div><p className="mt-4 text-gray-600">Fetching Codeforces Stats...</p></div>
            )}
            {errorCodeforces && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">{errorCodeforces}</div>}
            {codeforcesData && <CodeforcesCard codeforcesData={codeforcesData} />}
            {!loadingCodeforces && !errorCodeforces && !codeforcesData && (
              <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                <p>No Codeforces username found in your profile. Please add it to see your stats.</p>
              </div>
            )}
          </div>
          
          <div>
            {loadingCodeChef && (
              <div className="text-center p-8 bg-white rounded-lg shadow-md"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div><p className="mt-4 text-gray-600">Fetching CodeChef Stats...</p></div>
            )}
            {errorCodeChef && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">{errorCodeChef}</div>}
            {codechefData && <CodeChefCard codechefData={codechefData} />}
            {!loadingCodeChef && !errorCodeChef && !codechefData && (
              <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                <p>No CodeChef username found in your profile. Please add it to see your stats.</p>
              </div>
            )}
          </div>

          <div className="xl:col-span-2">
            {leetcodeData && codeforcesData && codechefData && (
              <ComparisonCard 
                leetcodeData={leetcodeData} 
                codeforcesData={codeforcesData} 
                codechefData={codechefData} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
