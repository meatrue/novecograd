export interface IMeetingProtocol {
  points: {
    theme: string;
    description: string;
    author: string;
  }[];
}

export interface IProtocolThemes {
  protocols: {
    name: string;
    themes: string[];
    descriptions: string[];
    authors: string[];
  }[];
}
