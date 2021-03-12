import { DataService, PullRequest, Repository } from './api.types';

export class DataServiceMock implements DataService {
  addRepository(): Promise<void> {
    return Promise.resolve(undefined);
  }

  closePullRequest(): Promise<void> {
    return Promise.resolve(undefined);
  }

  issuesCount(): Promise<number> {
    return Promise.resolve(0);
  }

  listPullRequests(): Promise<PullRequest[]> {
    return Promise.resolve([]);
  }

  listRepositories(): Promise<Repository[]> {
    return Promise.resolve([]);
  }

  mergePullRequest(): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeRepository(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
