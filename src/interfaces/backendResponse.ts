import { IUser } from '@/interfaces/user';
import { IActivity } from './activities';

export interface IBaseResponse {
  message: string;
}

export interface IAuthorizationResponse extends IBaseResponse {
  user?: IUser;
}

export interface IActivitiesResponse extends IBaseResponse {
  act: {
    id: number;
    name: string;
    responsible1: number;
    responsible2: number;
    origin: string;
    start: string;
    final_plan: string;
    final_fact: string;
  }[];
  people: {
    [key: number]: string;
  };
  showpage: boolean;
}

export interface IProposalsResponse extends IBaseResponse {
  dates: string[];
  props: string[];
  props_id: number[];
}

export interface IProposalsVotesResponse extends IBaseResponse {
  prop: {
    options: {
      [key: number]: number;
    };
    title: string;
  }[];
  showpage: boolean;
}

export interface ISurveysResponse extends IBaseResponse {
  showpage: boolean;
  options: string[][];
  surv: {
    id: number;
    title: string;
    date: string;
    options: string[];
  }[];
  votes: {
    id: number;
    title: string;
    votes: number[];
  }[];
}

export interface IMeetingsResponse extends IBaseResponse {
  showpage: boolean;
  mtng: string[];
}

export interface IMeetingProtocolResponse extends IBaseResponse {
  data: {
    theme: string;
    description: string;
    author_id: number;
  }[];
  people: {
    [key: number]: string;
  };
  showpage: boolean;
}

export interface IProtocolThemeSearchResponse extends IBaseResponse {
  founded: {
    themes: string[];
    descriptions: string[];
    authors: number[];
    founded_name: string;
  }[];
  people: {
    [key: number]: string;
  };
  showpage: true;
}

export interface IUserInfoResponse extends IBaseResponse {
  burth: string;
  contacts: string;
  family: string;
  first_name: string;
  from: string;
  land: number;
  last_name: string;
  location: string;
  member: number;
  people_id: number;
  role: string;
  second_name: string;
  skills: string;
  activities: IActivity[];
  showpage: boolean;
}

export interface IDocumentsResponse extends IBaseResponse {
  data: {
    name: string;
    descr: string;
    link: string;
  }[];
  showpage: boolean;
}