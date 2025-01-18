import { createEffect } from 'effector';
import { AxiosError } from 'axios';

import { IAddProposalParams, proposalsApi } from '@/api';
import {
  IBaseResponse,
  IProposalsResponse,
  IProposalsVotesResponse
} from '@/interfaces/backendResponse';

export const getProposalsFx = createEffect<
  void,
  IProposalsResponse,
  AxiosError
>(async () => {
  const response = await proposalsApi.getProposals();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const addProposalFx = createEffect<
  IAddProposalParams,
  IBaseResponse,
  AxiosError
>(async ({ newprop, people_id }) => {
  const response = await proposalsApi.addProposal({ newprop, people_id });
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});

export const getProposalsVotesFx = createEffect<
  void,
  IProposalsVotesResponse,
  AxiosError
>(async () => {
  const response = await proposalsApi.getProposalsVotes();
  if (response.status !== 200) throw new AxiosError('request_error');
  return response.data;
});