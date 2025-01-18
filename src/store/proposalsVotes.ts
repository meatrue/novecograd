import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { reset } from 'patronum';

import * as api from './proposalsApi';
import { IProposalVotes } from '@/interfaces/proposals';

const getProposalsVotesFx = attach({ effect: api.getProposalsVotesFx });

export const proposalsVotesPageMounted = createEvent<void>();
export const proposalsVotesPageUnmounted = createEvent<void>();

export const $proposalsVotes = createStore<IProposalVotes[]>([]);
export const $isProposalsVotesLoading = getProposalsVotesFx.pending;
export const $isProposalsVotesError = createStore<boolean>(false);

reset({
  clock: [proposalsVotesPageUnmounted],
  target: [
    $proposalsVotes,
    $isProposalsVotesError,
  ],
});

sample({
  clock: proposalsVotesPageMounted,
  target: getProposalsVotesFx,
});

sample({
  clock: getProposalsVotesFx.doneData,
  filter: (result) => Boolean(result.prop),
  fn: ({ prop }) => prop.map(({ title, options }) => ({
    title,
    options,
  })),
  target: $proposalsVotes,
});

$isProposalsVotesError.on(getProposalsVotesFx.failData, (_, error) => Boolean(error));
