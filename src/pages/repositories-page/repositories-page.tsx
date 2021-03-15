import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import { appStore } from '../../store/app-store';
import { AddRepository } from '../../components';
import './repositories-page.css';
import { Pulls } from '../../components/pulls/pulls';

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
      <h3>Issues {issues}</h3>

      <AddRepository add={appStore.addRepository} />

      <h2>Repositories</h2>
      {repositories?.map(({ id, html_url, full_name }) => (
        <div key={id}>
          <a href={html_url} target="_blank" rel="noreferrer">
            {full_name}
          </a>
        </div>
      ))}

      <Pulls store={appStore} />
    </div>
  );
});
