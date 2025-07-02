import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosconfig';

/*
  Problems page displays a list of problems fetched from the backend and allows the
  user to filter them by rating, tag and range. The page uses the backend endpoints:
  - GET /problems?rating=800
  - GET /problems?minRating=900&maxRating=1200&tag=dp,graphs&page=2
*/

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filter states
  const [rating, setRating] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [ratingPage, setRatingPage] = useState(0); // 0 => 800-1900, 1 => 2000-3500
  const [page, setPage] = useState(1);

  // Return tailwind text color class based on CF rating
  const getRatingColor = (r) => {
    if (r < 1200) return 'text-gray-600'; // Newbie
    if (r < 1400) return 'text-green-600'; // Pupil
    if (r < 1600) return 'text-teal-600'; // Specialist
    if (r < 1900) return 'text-blue-600'; // Expert / Candidate Master
    if (r < 2100) return 'text-purple-600'; // Master
    if (r < 2300) return 'text-orange-600'; // International Master
    return 'text-red-600'; // Grandmaster & above
  };

  const fetchProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (rating) {
        params.rating = rating;
      }
      if (selectedTags.length) params.tag = selectedTags.join(',');
      // fetch up to 100 problems once per rating
      params.limit = 100;
      // Request up to 100 problems at once
      

      const { data } = await axiosInstance.get('/problems', { params });
      setProblems(data?.data || data?.problems || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to load problems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch only when rating or selected tags change
    fetchProblems();
    // reset to first page when filter changes
    setPage(1);
  }, [rating, selectedTags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProblems();
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-green-50 min-h-screen text-blue-950">
      <h1 className="text-2xl font-bold mb-4 text-center">Problems</h1>

      {/* Filter Form */}
      {/* Tag selector */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center bg-green-50 p-4 rounded-xl shadow">
        {TAGS.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTags((prev) =>
                  prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                );
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${active ? 'bg-green-600 text-white' : 'bg-green-100 text-blue-950 hover:bg-green-200'} `}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Rating Selector */}
      <div className="flex items-center justify-center gap-4 mb-6 flex-wrap text-lg font-medium bg-green-50 p-4 rounded-xl shadow">
        <button
          onClick={() => setRatingPage((p) => Math.max(p - 1, 0))}
          disabled={ratingPage === 0}
          className="text-violet-900 disabled:opacity-40"
        >
          Prev
        </button>
        {RATING_PAGES[ratingPage].map((r) => {
          const ratingColor = getRatingColor(r);
          const active = Number(rating) === r;
          return (
            <button
              key={r}
              onClick={() => {
                setRating(String(r));
                setPage(1);
              }}
              className={`px-3 py-1 rounded transition-colors ${active ? `border border-green-600 ${ratingColor}` : `${ratingColor} hover:text-green-700`}`}
            >
              {r}
            </button>
          );
        })}
        <button
          onClick={() => setRatingPage((p) => Math.min(p + 1, RATING_PAGES.length - 1))}
          disabled={ratingPage === RATING_PAGES.length - 1}
          className="text-violet-900 disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && problems.length === 0 && (
        <p className="text-center">No problems found.</p>
      )}

      {/* Problems List */}
      {!loading && !error && problems.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">#</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Rating</th>
                
                
              </tr>
            </thead>
            <tbody className="bg-green-50 divide-y divide-gray-200">
              {problems.map((problem, index) => (
                <tr
                  key={problem._id || index}
                  onClick={() => {
                    const url = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
                    window.open(url, '_blank');
                  }}
                  className="cursor-pointer even:bg-green-100 odd:bg-green-50 hover:bg-green-200 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950 w-16 text-left">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950 text-center w-full">{problem.name || problem.title}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right w-20 ${getRatingColor(problem.rating)}`}>{problem.rating}</td>
                  



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {false && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => {
              if (page < totalPages) setPage(page + 1);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// tag options copied from provided image / cf tags
const TAGS = [
  '2-sat','binary search','bitmasks','brute force','chinese remainder theorem','combinatorics','constructive algorithms','data structures','dfs and similar','divide and conquer','dp','dsu','expression parsing','fft','flows','games','geometry','graph matchings','graphs','greedy','hashing','implementation','interactive','math','matrices','meet-in-the-middle','number theory','probabilities','schedules','shortest paths','sortings','string suffix structures','strings','ternary search','trees','two pointers'
];

// generate rating pages
const RATING_PAGES = [
  Array.from({ length: 12 }, (_, i) => 800 + i * 100), // 800..1900
  Array.from({ length: 16 }, (_, i) => 2000 + i * 100) // 2000..3500
];

export default Problems;
