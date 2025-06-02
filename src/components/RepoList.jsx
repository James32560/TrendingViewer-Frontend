import React from 'react';
import RepoCard from './RepoCard';

function RepoList({ repos, compareRepos, onCompareToggle }) {
  return (
    <div className="max-h-[32vh] overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No repositories found.
          </p>
        ) : (
          repos.map((repo) => (
            <RepoCard
              key={repo.repoName}
              repo={repo}
              isCompared={compareRepos.includes(repo.repoName)}
              onCompareToggle={onCompareToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RepoList;
