import React, { useState, useEffect, useRef } from 'react';
import Banner from './components/Banner';
import Filter from './components/Filter';
import RepoList from './components/RepoList';
import CompareList from './components/CompareList';
import StarsChart from './components/StarsChart';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  const serverIP = 'https://fastapi-backend-k204.onrender.com';
  const [darkMode, setDarkMode] = useState(true);
  const [repos, setRepos] = useState([]);
  const [filterData, setFilterData] = useState({
    codeLanguage: '',
    language: '',
    sortBy: '',
    date: '',
  });
  const [compareRepos, setCompareRepos] = useState([]);
  const [starsHistory, setStarsHistory] = useState([]);
  const prevCompareRepos = usePrevious(compareRepos);

  const handleCompareToggle = (repoName) => {
    setCompareRepos(prev =>
      prev.includes(repoName)
        ? prev.filter(name => name !== repoName)
        : [...prev, repoName]
    );
  };

  const handleRemoveCompare = (repoName) => {
    setCompareRepos(prev => prev.filter(name => name !== repoName));
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    if (!prevCompareRepos) return;

    const added = compareRepos.filter(name => !prevCompareRepos.includes(name));
    const removed = prevCompareRepos.filter(name => !compareRepos.includes(name));

    added.forEach(async (repoName) => {
      try {
        const response = await fetch(`${serverIP}/stars-history?repoName=${repoName}`);
        const data = await response.json();

        setStarsHistory(prev => {
          const updated = { ...prev };

          const dates = data.map(entry => entry.date);
          const stars = data.map(entry => entry.stars);

          updated[repoName] = {
            dates,
            stars,
          };

          return updated;
        });
      } catch (error) {
        console.error(`Failed to fetch stars history for ${repoName}`, error);
      }
    });

    if (removed.length > 0) {
      setStarsHistory(prev => {
        const updated = { ...prev };
        removed.forEach(name => {
          delete updated[name];
        });
        return updated;
      });
    }
  }, [compareRepos]);


  const fetchRepos = async () => {
    let url = serverIP;
    try {
      let params = new URLSearchParams();
      Object.entries(filterData).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      if (params.toString()) {
        url += `/filter?${params.toString()}`;
      }

      console.log('Fetching from URL:', url);

      const response = await fetch(url);
      const data = await response.json();
      setRepos(data || []);
    } catch (error) {
    console.error('Error fetching repos:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6 text-gray-900 dark:text-gray-100">
      <Banner darkMode={darkMode} setDarkMode={setDarkMode} />

      <Filter filterData={filterData} setFilterData={setFilterData} handleApplyFilter={fetchRepos} />

      <RepoList repos={repos} compareRepos={compareRepos} onCompareToggle={handleCompareToggle} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6 justify-center items-start">
        <CompareList compareRepos={compareRepos} onRemove={handleRemoveCompare} />
        <StarsChart starsHistory={starsHistory} />
      </div>
    </div>
  );
};

export default App;
