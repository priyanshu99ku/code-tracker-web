import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { fetchProfile } from '../utils/profileSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const { data: profile } = useSelector(state => state.profile);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    leetcode: '',
    codechef: '',
    codeforces: '',
    codeforcesurl: '',
    leetcodeurl: '',
    codechefurl: '',
    skills: '',
    about: '',
    gender: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchProfile(user.email));
    } else if (!user) {
      navigate('/');
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        mobile: profile.mobile || '',
        leetcode: profile.leetcode || '',
        codechef: profile.codechef || '',
        codeforces: profile.codeforces || '',
        codeforcesurl: profile.codeforcesurl || '',
        leetcodeurl: profile.leetcodeurl || '',
        codechefurl: profile.codechefurl || '',
        skills: profile.skills || '',
        about: profile.about || '',
        gender: profile.gender || '',
        role: profile.role || 'student'
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile/${user.email}`,
        formData
      );
      if (response.data.success) {
        alert('Profile updated successfully!');
        dispatch(fetchProfile(user.email)); // Re-fetch profile data
        navigate('/profile');
      } else {
        setError(response.data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-20">
        <div className="max-w-3xl mx-auto bg-green-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">Edit Profile</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-blue-950 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-blue-950 font-semibold mb-2">Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-blue-950 font-semibold mb-2">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-blue-950 font-semibold mb-2">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="about" className="block text-blue-950 font-semibold mb-2">About</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="skills" className="block text-blue-950 font-semibold mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, Node.js, Python"
              />
            </div>

            <h3 className="text-xl font-semibold text-blue-950 mb-4 mt-6">Competitive Programming Profiles</h3>

            <div className="mb-4">
              <label htmlFor="leetcode" className="block text-blue-950 font-semibold mb-2">LeetCode Username</label>
              <div className="flex items-center">
                <span className="inline-block bg-gray-200 px-3 py-2 border border-r-0 rounded-l-lg text-gray-600">https://leetcode.com/</span>
                <input
                  type="text"
                  id="leetcode"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username"
                />
              </div>
              <label htmlFor="leetcodeurl" className="block text-blue-950 font-semibold mt-2 mb-2">LeetCode Profile URL</label>
              <input
                type="text"
                id="leetcodeurl"
                name="leetcodeurl"
                value={formData.leetcodeurl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://leetcode.com/username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="codechef" className="block text-blue-950 font-semibold mb-2">CodeChef Username</label>
              <div className="flex items-center">
                <span className="inline-block bg-gray-200 px-3 py-2 border border-r-0 rounded-l-lg text-gray-600">https://www.codechef.com/users/</span>
                <input
                  type="text"
                  id="codechef"
                  name="codechef"
                  value={formData.codechef}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username"
                />
              </div>
              <label htmlFor="codechefurl" className="block text-blue-950 font-semibold mt-2 mb-2">CodeChef Profile URL</label>
              <input
                type="text"
                id="codechefurl"
                name="codechefurl"
                value={formData.codechefurl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.codechef.com/users/username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="codeforces" className="block text-blue-950 font-semibold mb-2">Codeforces Username</label>
              <div className="flex items-center">
                <span className="inline-block bg-gray-200 px-3 py-2 border border-r-0 rounded-l-lg text-gray-600">https://codeforces.com/profile/</span>
                <input
                  type="text"
                  id="codeforces"
                  name="codeforces"
                  value={formData.codeforces}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username"
                />
              </div>
              <label htmlFor="codeforcesurl" className="block text-blue-950 font-semibold mt-2 mb-2">Codeforces Profile URL</label>
              <input
                type="text"
                id="codeforcesurl"
                name="codeforcesurl"
                value={formData.codeforcesurl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://codeforces.com/profile/username"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <span>Save Changes</span>
                )}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
