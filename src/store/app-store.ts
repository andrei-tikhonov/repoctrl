import { makeObservable, observable, action, computed } from 'mobx';
import { Repository } from '../api/api.types';
import { OctokitService } from '../api/octokit-service';

type AppStoreStatus = 'none' | 'wait' | 'ready' | 'error';

export class AppStore {
  loaderStatus: AppStoreStatus = 'none';
  loaderError?: Error;
  service: OctokitService;
  repositories?: Repository[];

  constructor(service: OctokitService) {
    this.service = service;
    this.addRepository = this.addRepository.bind(this);

    makeObservable(this, {
      loaderStatus: observable,
      loaderError: observable,
      repositories: observable,
      onWait: action,
      onReady: action,
      onError: action,
      setRepositories: action,
      errorMessage: computed,
      issues: computed,
    });
  }

  get errorMessage(): string {
    if (this.loaderError instanceof Error) {
      return this.loaderError.message;
    }
    return '';
  }

  get issues(): number {
    if (!this.repositories) {
      return 0;
    }

    return this.repositories?.reduce(
      (previousValue: number, { open_issues_count }: Repository) =>
        previousValue + open_issues_count,
      0
    );
  }

  onWait(): void {
    this.loaderStatus = 'wait';
  }

  onReady(): void {
    this.loaderStatus = 'ready';
    this.loaderError = undefined;
  }

  onError(error: Error): void {
    this.loaderStatus = 'error';
    this.loaderError = error;
  }

  setRepositories(repositories: Repository[]): void {
    this.repositories = repositories;
  }

  async removeRepository(name: string, owner: string): Promise<void> {
    try {
      await this.service.removeRepository(name, owner);
    } catch (error) {
      this.onError(error);
    }
    await this.update();
  }

  async addRepository(name: string): Promise<void> {
    try {
      await this.service.addRepository(name);
    } catch (error) {
      this.onError(error);
    }
    await this.update();
  }

  async init(): Promise<void> {
    if (!this.repositories) {
      await this.update();
    }
  }

  async update(): Promise<void> {
    this.onWait();
    try {
      const repositories = await this.service.listRepositories();
      this.setRepositories(repositories);
      this.onReady();
    } catch (error) {
      this.onError(error);
    }
  }
}

const service = new OctokitService();
export const appStore = new AppStore(service);
