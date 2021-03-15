import React, { FunctionComponent } from 'react';
import { AppStore } from '../../store/app-store';
import { observer } from 'mobx-react';

interface AddRepositoryProps {
  store: AppStore;
}

export const Pulls: FunctionComponent<AddRepositoryProps> = observer(
  ({ store }) => {
    const { repositories } = store;

    return (
      <>
        <h2>Pull Requests</h2>
        {repositories?.map(({ id, full_name, pulls, name }) => {
          if (pulls.length > 0) {
            return (
              <div key={id}>
                <h3>{full_name}</h3>
                {pulls.map(({ id, html_url, body, title, number, user }) => {
                  return (
                    <div key={id}>
                      <h4>
                        <a href={html_url} target="_blank" rel="noreferrer">
                          {title}
                        </a>
                      </h4>
                      <p>{body}</p>
                      <button onClick={() => store.merge(name, number, user)}>
                        Merge
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </>
    );
  }
);
