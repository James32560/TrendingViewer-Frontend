import React from 'react';

function Banner({ darkMode, setDarkMode }) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-2xl p-3 mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white ml-4">GitHub Trending Viewer</h1>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-4 rounded-2xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default Banner;
