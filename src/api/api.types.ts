export type Pull = {
    body: string | null;
    html_url: string;
    id: number;
    state: string;
    title: string;
    user?: string;
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  open_issues_count: number;
  owner?: string;
  pulls: Pull[];
};
