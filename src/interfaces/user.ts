import { IActivity } from './activities';

export interface IUser {
  username: string;
  people_id: number;
  admin: boolean;
}

export enum IS_MEMBER_OF_COOPERATIVE {
  YES = 'да',
  NO = 'нет'
}

export interface IUserInfo {
  peopleId: number;
  firstName: string;
  secondName: string;
  lastName: string;
  birth: string;
  family: string;
  contacts: string;
  location: string;
  from: string;
  land: number;
  member: IS_MEMBER_OF_COOPERATIVE;
  role: string;
  skills: string;
  activities: IActivity[];
}