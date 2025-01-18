export interface ISurvey {
  id: number;
  title: string;
  date: string;
  options: string[];
}

export interface ISurveyVoted {
  id: number;
  title: string;
  options: {
    value: string;
    votes: number;
  }[];
}