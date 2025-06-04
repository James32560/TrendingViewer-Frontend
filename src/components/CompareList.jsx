import React from 'react';
import { X } from 'lucide-react';

function CompareList({ compareRepos, onRemove }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-xs h-fit">
      {compareRepos.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No repositories selected.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {compareRepos.map(name => (
            <li
            key={name}
            className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md"
            >
            <span className="truncate">{name}</span>
            <button
                onClick={() => onRemove(name)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${name}`}
            >
                <X size={16} />
            </button>
            </li>
        ))}
        </ul>
      )}
    </div>
  );
}

export default CompareList;
