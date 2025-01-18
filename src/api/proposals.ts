import { axios } from '@/api/axios';

import {
  IBaseResponse,
  IProposalsResponse,
  IProposalsVotesResponse
} from '@/interfaces/backendResponse';

export interface IAddVoteParams {
  prop_number: number;
  prop_id: number;
  vote_result: string;
}

export interface IAddProposalParams {
  newprop: string;
  people_id: number;
}

export const proposalsApi = {
  getProposals: () => axios.get<IProposalsResponse>('/proposals'),
  addVote: (params: IAddVoteParams) => axios.post<IBaseResponse>('/proposals', params),
  addProposal: (params: IAddProposalParams) => axios.post<IBaseResponse>('/proposals', params),
  getProposalsVotes: () => axios.get<IProposalsVotesResponse>('/proposals_vote'),
};