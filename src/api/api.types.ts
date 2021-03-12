export type Repository = {
  name: string;
};

export type PullRequest = {
  name: string;
};

export interface DataService {
  listRepositories: () => Promise<Repository[]>;
  listPullRequests: () => Promise<PullRequest[]>;
  issuesCount: () => Promise<number>;
  addRepository: () => Promise<void>;
  removeRepository: () => Promise<void>;
  mergePullRequest: () => Promise<void>;
  closePullRequest: () => Promise<void>;
}
