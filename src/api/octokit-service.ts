import { PullRequest, Repository } from './api.types';
import { OctokitResponse } from '@octokit/types';
import { octokit } from './oktokit';

export class OctokitService {
  addRepository(name: string): Promise<OctokitResponse<unknown>> {
    return octokit.repos.createForAuthenticatedUser({ name });
  }

  closePullRequest(): Promise<void> {
    return Promise.resolve(undefined);
  }

  listPullRequests(): Promise<PullRequest[]> {
    return Promise.resolve([]);
  }

  async listRepositories(): Promise<Repository[]> {
    const { data } = await octokit.repos.listForAuthenticatedUser();
    console.log({ data });
    return data.map(({ name, html_url, open_issues_count, id }) => ({
      name,
      html_url,
      open_issues_count,
      id,
    }));
  }

  mergePullRequest(): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeRepository(repo: string, owner: string): Promise<OctokitResponse<never>> {
    return octokit.repos.delete({ repo, owner });
  }
}
