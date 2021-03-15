import React, { FunctionComponent } from 'react';
import { AppStore } from '../../store/app-store';

interface AddRepositoryProps {
  store: AppStore;
}

export const Pulls: FunctionComponent<AddRepositoryProps> = ({ store }) => {
  const { repositories } = store;

  return (
    <>
      <h2>Pull Requests</h2>
      {repositories?.map(({ id, full_name, pulls }) => {
        if (pulls.length > 0) {
          return (
            <div key={id}>
              <h3>{full_name}</h3>
              {pulls.map(({ id, html_url, body, title }) => {
                return (
                  <div key={id}>
                    <h4>
                      <a href={html_url} target="_blank" rel="noreferrer">
                        {title}
                      </a>
                    </h4>
                    <p>{body}</p>
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </>
  );
};
