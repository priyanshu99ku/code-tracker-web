import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-950 text-white text-center py-3 mt-auto shadow-inner">
      &copy; {new Date().getFullYear()} CodeTracker. All rights reserved.
    </footer>
  );
};

export default Footer;
