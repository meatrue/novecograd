export interface IProposal {
  id: number | string;
  title: string;
  date: string;
}

export interface IProposalVotes {
  title: string;
  options: {
    [key: number]: number;
  };
}