import { IVotingOption } from '@/interfaces/common';

export const getVotesCountFromStatistics = (statistics: IVotingOption[]) => (
  statistics.reduce((sum, item) => sum + item.votes, 0)
);