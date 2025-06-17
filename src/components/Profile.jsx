import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../utils/profileSlice';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const { data: profile, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    dispatch(fetchProfile(user.email));
  }, [user, dispatch, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-200 flex items-center justify-center">
        <div className="text-red-500">Error loading profile: {error}</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold text-center text-blue-950 mb-8">
          {profile?.name || 'Profile'}
        </h1>
        <div className="max-w-3xl mx-auto bg-green-100 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <button 
              className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              onClick={() => navigate('/edit-profile')}
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto bg-blue-950 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl text-white font-bold">{profile?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <h2 className="text-2xl font-semibold text-center text-blue-950 mb-2">
              {profile?.name || 'User Profile'}
            </h2>
            <p className="text-blue-950">{profile?.email}</p>
          </div>
          <div className="space-y-6">
            <div className="border-t border-blue-950 pt-4">
              <h3 className="text-lg font-semibold text-blue-950 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-950">Role</p>
                  <p className="text-lg font-semibold text-blue-950">{profile?.role || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-950">Gender</p>
                  <p className="text-lg font-semibold text-blue-950">{profile?.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-950">Mobile</p>
                  <p className="text-lg font-semibold text-blue-950">{profile?.mobile || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-950">About</p>
                  <p className="text-lg font-semibold text-blue-950">{profile?.about || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-950 pt-4">
              <h3 className="text-lg font-semibold text-blue-950 mb-4">Competitive Programming Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-950">LeetCode</p>
                  {profile?.leetcode ? (
                    <a href={`https://leetcode.com/${profile.leetcode}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-950 hover:text-blue-700">
                      {profile.leetcode}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-gray-500">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-blue-950">CodeChef</p>
                  {profile?.codechef ? (
                    <a href={`https://www.codechef.com/users/${profile.codechef}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-950 hover:text-blue-700">
                      {profile.codechef}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-gray-500">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-blue-950">Codeforces</p>
                  {profile?.codeforces ? (
                    <a href={`https://codeforces.com/profile/${profile.codeforces}`} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-950 hover:text-blue-700">
                      {profile.codeforces}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-gray-500">N/A</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-blue-950 pt-4">
              <h3 className="text-lg font-semibold text-blue-950 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile?.skills?.split(',').map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-950 rounded-full text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>



            <div className="border-t border-blue-950 pt-4">
              <h3 className="text-lg font-semibold text-blue-950 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-950">Created At</p>
                  <p className="text-lg font-semibold text-blue-950">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-950">Last Updated</p>
                  <p className="text-lg font-semibold text-blue-950">
                    {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
