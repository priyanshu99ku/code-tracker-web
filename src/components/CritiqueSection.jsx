import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import axiosInstance from '../utils/axiosconfig';

const CritiqueSection = () => {
  const [feedbacks, setFeedbacks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Uncomment and update the API endpoint when available
    // axiosInstance.get('/feedback').then(res => {
    //   setFeedbacks(res.data.data || []);
    //   setLoading(false);
    // }).catch(() => {
    //   setError('Could not load critiques.');
    //   setLoading(false);
    // });
    setLoading(false);
    setFeedbacks(null); // Simulate no feedback yet
  }, []);

  return (
    <section id="critique" className="w-full max-w-2xl mx-auto my-12 bg-green-100 rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold text-blue-950 mb-2 flex items-center"><FaRegCommentDots className="mr-2" />Critique</h2>
      {loading && <p className="text-gray-500">Loading critiques...</p>}
      {!loading && feedbacks && feedbacks.length > 0 && feedbacks.map(fb => (
        <div key={fb._id || fb.email} className="bg-green-50 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="text-blue-950 font-semibold text-lg mb-1">{fb.email}</div>
            <div className="flex items-center mb-2">
              {[1,2,3,4,5].map(star => (
                <span key={star} className={star <= fb.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
              <span className="ml-2 text-blue-950 font-bold">{fb.rating}/5</span>
            </div>
            <div className="text-gray-700 mt-1">{fb.feedback}</div>
          </div>
        </div>
      ))}
      {!loading && (!feedbacks || feedbacks.length === 0) && (
        <div className="bg-green-50 text-blue-950 rounded shadow p-6 text-center">
          <p className="text-lg font-semibold">No feedback yet</p>
          <p className="text-gray-600">Be the first to leave a critique!</p>
        </div>
      )}
    </section>
  );
};

export default CritiqueSection;
