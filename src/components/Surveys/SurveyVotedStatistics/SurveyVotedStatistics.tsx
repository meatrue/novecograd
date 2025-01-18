import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { CHART_COLORS } from '@/constants/utils';

interface ISurveyVotedStatisticsProps {
  statistics: {
    value: string;
    votes: number;
  }[];
}

export const SurveyVotedStatistics: React.FC<ISurveyVotedStatisticsProps> = ({ statistics }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <PieChart width={600} height={300}>
        <Pie
          data={statistics}
          dataKey="votes"
          nameKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {statistics.map((_, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};