import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosconfig';

const ContestSection = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const contestsPerPage = 5;

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosInstance.get('/contest');
        setContests(res.data.data || []);
      } catch (err) {
        setError('Failed to load contests.');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  return (
    <section id="contest" className="w-full max-w-2xl mx-auto my-12 bg-green-100 rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-blue-950 mb-2">Contests</h2>
      {loading && <p className="text-gray-500">Loading contests...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && contests.length === 0 && (
        <p className="text-gray-700">No contests found.</p>
      )}
      <ul>
        {contests.slice((page-1)*contestsPerPage, page*contestsPerPage).map((contest, idx) => (
          <li key={contest.title + contest.startTime + idx} className="mb-4 p-4 bg-green-50 rounded shadow-sm">
            <div className="font-semibold text-blue-950 text-lg">{contest.title}</div>
            <div className="text-gray-600">Platform: {contest.site}</div>
            <div className="text-gray-600">Start: {new Date(contest.startTime).toLocaleString()}</div>
            {contest.duration && <div className="text-gray-600">Duration: {Math.floor(contest.duration / 3600000)}h {Math.floor((contest.duration % 3600000) / 60000)}m</div>}
            {contest.url && <a href={contest.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Go to Contest</a>}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          className="btn bg-green-200 text-blue-950 font-bold px-4 py-2 rounded disabled:opacity-50 border-none shadow"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-blue-950 font-semibold">Page {page} of {Math.max(1, Math.ceil(contests.length / contestsPerPage))}</span>
        <button
          className="btn bg-green-300 text-blue-950 font-bold px-4 py-2 rounded disabled:opacity-50 border-none shadow"
          onClick={() => setPage((p) => Math.min(Math.ceil(contests.length / contestsPerPage), p + 1))}
          disabled={page === Math.ceil(contests.length / contestsPerPage) || contests.length === 0}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ContestSection;
