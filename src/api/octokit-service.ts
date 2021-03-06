import { Repository } from './api.types';
import { OctokitResponse } from '@octokit/types';
import { octokit } from './oktokit';

export class OctokitService {
  addRepository(name: string): Promise<OctokitResponse<unknown>> {
    return octokit.repos.createForAuthenticatedUser({ name });
  }

  closePullRequest(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async listRepositories(): Promise<Repository[]> {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser();

    const pulls = await Promise.all(
      repos.map(({ name, owner }) => {
        return owner
          ? octokit.pulls
              .list({ repo: name, owner: owner.login })
              .then(({ data }) => data)
          : Promise.resolve([]);
      })
    );

    return repos.map(
      ({ name, full_name, html_url, open_issues_count, id, owner }, i) => ({
        name,
        full_name,
        html_url,
        open_issues_count,
        owner: owner?.login,
        id,
        pulls: pulls[i]
          .map(({ body, html_url, id, state, title, user, number }) => ({
            body,
            html_url,
            id,
            state,
            title,
            user: user?.login,
            number,
          })),
      })
    );
  }

  mergePullRequest(
    owner: string,
    repo: string,
    pull_number: number
  ): Promise<OctokitResponse<unknown>> {
    return octokit.pulls.merge({
      owner,
      repo,
      pull_number,
    });
  }

  removeRepository(
    repo: string,
    owner: string
  ): Promise<OctokitResponse<never>> {
    return octokit.repos.delete({ repo, owner });
  }
}
