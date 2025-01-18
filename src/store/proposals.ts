import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { and, not, or, reset } from 'patronum';
import { format } from 'date-fns';

import * as api from './proposalsApi';
import { IProposal } from '@/interfaces/proposals';
import { $authData } from './authorization';
import { IAddProposalParams } from '@/api';
import { UNKNOWN_ERROR } from '@/constants/error';

const IS_SUCCESSFULLY_ADDED_MESSAGE = 'Ваше предложение внесено в базу и теперь за него смогут голосовать кооператоры!';

const getProposalsFx = attach({ effect: api.getProposalsFx });
const addProposalFx = attach({ effect: api.addProposalFx });

export const proposalsPageMounted = createEvent<void>();
export const proposalsPageUnmounted = createEvent<void>();
export const proposalChanged = createEvent<string>();
export const proposalAdded = createEvent<void>();
export const proposalAddedMessageReseted = createEvent<void>();

export const $proposals = createStore<IProposal[]>([]);
export const $isLoading = getProposalsFx.pending;
export const $isError = createStore<boolean>(false);

export const $newProposal = createStore<string>('');
export const $isAddedSuccessfully = createStore<boolean>(false);
export const $proposalAddedMessage = createStore<string>('');
export const $isNewProposalAdding = addProposalFx.pending;
export const $isAddingProposalError = createStore<boolean>(false);
export const $formDisabled = createStore<boolean>(false);

reset({
  clock: [proposalsPageUnmounted],
  target: [
    $proposals,
    $isError,
    $newProposal,
    $isAddedSuccessfully,
    $proposalAddedMessage,
    $isAddingProposalError,
  ],
});

$proposalAddedMessage.reset(proposalAddedMessageReseted);

$isAddedSuccessfully.on(
  addProposalFx.doneData,
  (_, result) => result.message === IS_SUCCESSFULLY_ADDED_MESSAGE
);
sample({
  clock: addProposalFx.doneData,
  source: {
    isSuccess: $isAddedSuccessfully,
    proposal: $newProposal
  },
  fn: ({ isSuccess, proposal }) => isSuccess ? '': proposal,
  target: $newProposal,
});

$formDisabled.on($isLoading, (_, isLoading) => isLoading);
export const $submitDisabled = or(not($newProposal), $formDisabled);

$newProposal.on(proposalChanged, (_, proposal) => proposal);

sample({
  clock: proposalsPageMounted,
  target: getProposalsFx,
});

sample({
  clock: getProposalsFx.doneData,
  filter: (result) => Boolean(result?.props?.length),
  fn: (result) => result.props.map((proposal, index) => ({
    id: result.props_id[index],
    title: proposal,
    date: format(result.dates[index], 'dd.MM.yyyy'),
  })),
  target: $proposals,
});

$isError.on(getProposalsFx.failData, (_, error) => Boolean(error));

sample({
  clock: proposalAdded,
  source: { authData: $authData, newprop: $newProposal },
  filter: and($authData, $newProposal),
  fn: ({ authData, newprop }) => ({
    people_id: authData?.people_id,
    newprop
  }) as IAddProposalParams,
  target: addProposalFx,
});

$isAddingProposalError.on(addProposalFx.failData, (_, error) => Boolean(error));

$proposalAddedMessage.on(
  addProposalFx.doneData,
  (_, result) => result.message
);

$proposalAddedMessage.on(
  addProposalFx.failData,
  (_, isError) => isError ? UNKNOWN_ERROR : ''
);

sample({
  clock: addProposalFx.doneData,
  filter: (result) => result.message === IS_SUCCESSFULLY_ADDED_MESSAGE,
  target: getProposalsFx,
});
