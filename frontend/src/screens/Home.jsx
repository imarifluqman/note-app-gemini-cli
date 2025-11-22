import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-full max-w-xl p-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Notes App
        </h1>
        <p className="text-sm sm:text-lg text-gray-700 mb-10">
          Your personal space to jot down thoughts, organize tasks, and keep track of everything important.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button
              className="inline-flex items-center px-6 sm:px-8 py-4 text-sm sm:text-lg font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105 duration-300"
              style={{ backgroundColor: '#6B46C1', focusRingColor: '#6B46C1' }}
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              className="inline-flex items-center px-6 sm:px-8  py-4 text-sm sm:text-lg font-semibold text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105 duration-300"
              style={{ backgroundColor: '#007bff', focusRingColor: '#007bff' }}
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
