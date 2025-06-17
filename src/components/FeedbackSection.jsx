import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section id="feedback" className="w-full max-w-2xl mx-auto my-12 bg-green-100 rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold text-blue-950 mb-2">Feedback</h2>
      <p className="text-gray-700 mb-4">We value your feedback! Please share your thoughts and suggestions to help us improve Code Tracker.</p>
      <form className="space-y-6">
        <div>
          <label className="block text-blue-950 font-semibold mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full px-4 py-2 rounded focus:ring-2 focus:ring-blue-950 focus:outline-none bg-green-50"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-blue-950 font-semibold mb-1">Rating</label>
          <div className="flex items-center space-x-1">
            {[1,2,3,4,5].map((star) => (
              <button
                type="button"
                key={star}
                className={`focus:outline-none ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
                aria-label={`Rate ${star}`}
              >
                <FaStar size={28} />
              </button>
            ))}
            <span className="ml-2 text-blue-950 font-bold">{rating || ''}</span>
          </div>
        </div>
        <div>
          <label className="block text-blue-950 font-semibold mb-1" htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            className="textarea textarea-bordered w-full px-4 py-2 rounded focus:ring-2 focus:ring-blue-950 focus:outline-none bg-green-50"
            rows={4}
            placeholder="Share your thoughts..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded hover:bg-blue-900 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
};

export default FeedbackSection;
