import React, { useEffect, useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import axiosInstance from '../utils/axiosconfig';

const CritiqueSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axiosInstance.get('/feedback').then(res => {
      setFeedbacks(res.data.data || []);
      setLoading(false);
    }).catch(() => {
      setError('Could not load critiques.');
      setLoading(false);
    });
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="critique" className="w-full max-w-2xl mx-auto my-12 bg-green-100 rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold text-blue-950 mb-2 flex items-center"><FaRegCommentDots className="mr-2" />Critique</h2>
      {loading && <p className="text-gray-500">Loading critiques...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && feedbacks.length > 0 && (
        <div className="relative">
          <div className="bg-green-50 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="text-blue-950 font-semibold text-lg mb-1">{feedbacks[currentIndex].email}</div>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={star <= feedbacks[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                ))}
                <span className="ml-2 text-blue-950 font-bold">{feedbacks[currentIndex].rating}/5</span>
              </div>
              <div className="text-gray-700 mt-1">{feedbacks[currentIndex].comments}</div>
            </div>
          </div>
          {feedbacks.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
              <button onClick={handlePrev} className="bg-blue-950 text-white rounded-full p-2 -ml-12">{'<'}</button>
              <button onClick={handleNext} className="bg-blue-950 text-white rounded-full p-2 -mr-12">{'>'}</button>
            </div>
          )}
        </div>
      )}
      {!loading && !error && feedbacks.length === 0 && (
        <div className="bg-green-50 text-blue-950 rounded shadow p-6 text-center">
          <p className="text-lg font-semibold">No feedback yet</p>
          <p className="text-gray-600">Be the first to leave a critique!</p>
        </div>
      )}
    </section>
  );
};

export default CritiqueSection;
