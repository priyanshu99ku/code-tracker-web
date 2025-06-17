import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../utils/userSlice';
import { 
  FaHome, 
  FaCalendarCheck,
  FaCommentDots,
  FaClipboardCheck,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="w-full bg-blue-950 py-3 px-4 flex justify-between items-center shadow-md">
      <Link to="/home" className="text-white text-2xl font-bold {user ? '' : 'opacity-50 cursor-not-allowed'}">CodeTracker</Link>
      <div className="flex items-center">
        {/* Main Navigation Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white flex items-center space-x-2"
          >
            <span>Welcoome {user.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2">
              {/* Navigation Items */}
              <Link to="/home" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2 {user ? '' : 'opacity-50 cursor-not-allowed'}">
                <FaHome className="w-5 h-5" /> Home
              </Link>
              <a href="#contest" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2">
                <FaCalendarCheck className="w-5 h-5" /> Contest
              </a>
              <a href="#feedback" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2">
                <FaCommentDots className="w-5 h-5" /> Feedback
              </a>
              <a href="#critique" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2">
                <FaClipboardCheck className="w-5 h-5" /> Critique
              </a>
              <div className="border-t border-gray-200 my-2"></div>
              {/* User Actions */}
              {user ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2">
                    <FaUserCircle className="w-5 h-5" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(clearUser());
                      navigate('/');
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <FaSignOutAlt className="w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2">
                  <FaUserCircle className="w-5 h-5" /> Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
