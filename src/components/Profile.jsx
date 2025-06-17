import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosconfig';

const Profile = () => {
  const reduxUser = useSelector(state => state.user.user);
  const [user, setUser] = useState(reduxUser); // show redux user immediately
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(reduxUser || {});
  const [success, setSuccess] = useState('');

  // Only fetch from API if you want to sync, but always show Redux user first
  useEffect(() => {
    setUser(reduxUser);
    setForm(reduxUser || {});
    setError('');
    setSuccess('');
    // Optionally, fetch from API to get latest profile
    // setLoading(true);
    // axiosInstance.get('http://localhost:3000/api/profile').then(res => {
    //   setUser(res.data.user || res.data);
    //   setForm(res.data.user || res.data);
    //   setLoading(false);
    // }).catch(() => setLoading(false));
    // eslint-disable-next-line
  }, [reduxUser]);

  const handleEdit = () => {
    setEditMode(true);
    setSuccess('');
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axiosInstance.post('http://localhost:3000/api/profile', form);
      setUser(res.data.user || res.data);
      setEditMode(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="flex flex-col items-center justify-center bg-green-100 rounded-xl shadow-lg p-8 max-w-2xl w-full mb-8 mt-8">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-4 text-center">Profile</h1>
        {loading ? (
          <div className="text-blue-950 font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-yellow-700 font-semibold mb-4">{error}</div>
        ) : null}
        {user && !editMode ? (
          <>
            <div className="mb-2 text-lg text-blue-950 font-semibold">Name: <span className="font-normal text-blue-900">{user.name || 'N/A'}</span></div>
            <div className="mb-2 text-lg text-blue-950 font-semibold">Email: <span className="font-normal text-blue-900">{user.email || 'N/A'}</span></div>
            <div className="mb-2 text-lg text-blue-950 font-semibold">Gender: <span className="font-normal text-blue-900">{user.gender || 'N/A'}</span></div>
            <div className="mb-2 text-lg text-blue-950 font-semibold">Mobile: <span className="font-normal text-blue-900">{user.mobile || 'N/A'}</span></div>
            <div className="mb-2 text-lg text-blue-950 font-semibold">CodeChef: <span className="font-normal text-blue-900">{user.codechef || 'N/A'}</span></div>
            <div className="mb-2 text-lg text-blue-950 font-semibold">Codeforces: <span className="font-normal text-blue-900">{user.codeforces || 'N/A'}</span></div>
            <div className="mb-4 text-lg text-blue-950 font-semibold">LeetCode: <span className="font-normal text-blue-900">{user.leetcode || 'N/A'}</span></div>
            <button onClick={handleEdit} className="mt-4 bg-blue-950 text-white font-bold py-2 px-6 rounded hover:bg-blue-900 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400">Edit Profile</button>
          </>
        ) : null}
        {editMode && (
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4 mt-4">
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">Name</label>
              <input name="name" value={form.name || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" required />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">Email</label>
              <input name="email" type="email" value={form.email || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" required />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">Gender</label>
              <select name="gender" value={form.gender || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">Mobile</label>
              <input name="mobile" value={form.mobile || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" maxLength={10} />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">CodeChef</label>
              <input name="codechef" value={form.codechef || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">Codeforces</label>
              <input name="codeforces" value={form.codeforces || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-950 font-semibold mb-1">LeetCode</label>
              <input name="leetcode" value={form.leetcode || ''} onChange={handleChange} className="input input-bordered px-4 py-2 rounded bg-green-50" />
            </div>
            <div className="flex flex-row gap-4 mt-4">
              <button type="submit" className="bg-blue-950 text-white font-bold py-2 px-6 rounded hover:bg-blue-900 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-300 text-blue-950 font-bold py-2 px-6 rounded hover:bg-gray-400 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400">Cancel</button>
            </div>
            {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
            {success && <div className="text-green-700 font-semibold mt-2">{success}</div>}
          </form>
        )}
        {!user && !loading && (
          <div className="text-red-600 font-semibold">No user data available.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
