import React from 'react';
import { Star, GitFork } from 'lucide-react';

function RepoCard({ repo, isCompared, onCompareToggle }) {
  return (
    <div className="relative bg-white dark:bg-gray-800 pt-2 pb-2 px-4 rounded-2xl shadow-md w-full max-w-2xl">
      <div className="absolute top-2 right-2">
        <label className="relative block h-5 w-5">
          <input
            type="checkbox"
            checked={!!isCompared}
            onChange={() => onCompareToggle(repo.repoName)}
            className="peer appearance-none h-5 w-5 rounded-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer checked:bg-blue-600 transition-colors"
          />
          <svg
            className="pointer-events-none absolute left-0 top-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </label>
      </div>

      <h2 className="text-lg font-semibold mb-1">
        <a
          href={`https://github.com/${repo.repoName}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.repoName}
        </a>
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 overflow-y-auto max-h-14 min-h-14">
        {repo.description}
      </p>

      <div className="text-sm flex flex-wrap gap-4 text-gray-700 dark:text-gray-400 items-center">
        <span><strong>Language:</strong> {repo.codeLanguage}</span>
        <span className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500" />
          {repo.totalStars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={16} className="text-green-500" />
          {repo.forks}
        </span>
      </div>
    </div>
  );
}

export default RepoCard;
