import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../../store/app-store';
import { AddRepository } from '../../components';
import './repositories-page.css';

export const RepositoriesPage: FunctionComponent = observer(() => {
  const { repositories, issues } = appStore;

  React.useEffect(() => {
    appStore.init();
  }, []);

  return (
    <div
      className={`repository-page repository-page--${appStore.loaderStatus}`}
    >
      {appStore.loaderStatus === 'wait' && <div>Loading...</div>}
      <h3>Total issues {issues}</h3>

      <AddRepository add={appStore.addRepository} />

      <h3>Repositories</h3>
      {repositories?.map(({ id, html_url, name }) => (
        <div key={id}>
          <a href={html_url} target="_blank" rel="noreferrer">
            {name}
          </a>
        </div>
      ))}
    </div>
  );
});
