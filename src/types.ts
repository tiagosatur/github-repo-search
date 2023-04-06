export interface SearchResult {
  owner: {
    login: string;
  };
  stargazers_count: number;
  language: string | null;
  name: string;
  description: string;
  updated_at: string;
}

export interface SelectedFilter {
  language: string;
  general: string;
}
