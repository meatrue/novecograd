import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { IVotingOption } from '@/interfaces/common';
import { CHART_COLORS } from '@/constants/utils';
import { getVotesCountFromStatistics } from '@/utils/proposal';

interface IProposalVotesStatisticsProps {
  statistics: IVotingOption[];
}

export const ProposalVotesStatistics: React.FC<IProposalVotesStatisticsProps> = ({
  statistics
}) => {
  const votesCount = getVotesCountFromStatistics(statistics);

  if (!votesCount) return (
    <div className="flex items-center justify-center">Никто не проголосовал</div>
  );

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