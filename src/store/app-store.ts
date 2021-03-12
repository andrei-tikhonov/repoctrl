import { makeObservable, observable, action, computed } from 'mobx';
import { DataService } from '../api/api.types';

type AppStoreStatus = 'none' | 'wait' | 'ready' | 'error';

export class AppStore {
  loaderStatus: AppStoreStatus = 'none';
  loaderError?: Error;
  service: DataService;

  constructor(service: DataService) {
    this.service = service;

    makeObservable(this, {
      loaderStatus: observable,
      loaderError: observable,
      onWait: action,
      onReady: action,
      onError: action,
      errorMessage: computed,
    });
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

  get errorMessage(): string {
    if (this.loaderError instanceof Error) {
      return this.loaderError.message;
    }
    return '';
  }
}
