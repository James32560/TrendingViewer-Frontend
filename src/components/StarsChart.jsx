import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function StarsChart({ starsHistory }) {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];

  const { chartData, minY, maxY } = useMemo(() => {
    const dateMap = {};
    let min = Infinity;
    let max = -Infinity;

    for (const [repoName, { dates, stars }] of Object.entries(starsHistory)) {
      dates.forEach((date, i) => {
        const starCount = stars[i];
        if (!dateMap[date]) {
          dateMap[date] = { date };
        }
        dateMap[date][repoName] = starCount;
        if (starCount < min) min = starCount;
        if (starCount > max) max = starCount;
      });
    }

    return {
      chartData: Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date)),
      minY: min,
      maxY: max
    };
  }, [starsHistory]);

  const repoNames = Object.keys(starsHistory);

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Repository Stars Over Time
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis domain={[minY, maxY]} />
          <Tooltip />
          <Legend />
          {repoNames.map((repo, index) => (
            <Line
              key={repo}
              type="monotone"
              dataKey={repo}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StarsChart;
