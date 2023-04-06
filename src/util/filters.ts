import { SearchResult, SelectedFilter } from '../types';

export const sorting = {
  alphabetical: {
    value: 'alphabetical',
    label: 'Alphabetical',
  },

  lastCommitDate: {
    value: 'lastCommitDate',
    label: 'Last commit date',
  },
  starsDescending: {
    value: 'starsDescending',
    label: 'Stars descending',
  },
};

export const getLanguages = (searchResults: SearchResult[]): string[] => {
  const allLanguages: string[] = searchResults.reduce(
    (acc, result: SearchResult) => {
      if (result.language) {
        acc.push(result.language);
      }
      return acc;
    },
    [] as string[]
  );

  return allLanguages.filter((lang, i) => allLanguages.indexOf(lang) === i);
};

export const getFilteredResults = (
  searchResultList: SearchResult[],
  selectedFilter: SelectedFilter
) => {
  return searchResultList
    .filter((repo) => {
      if (
        selectedFilter.language !== 'None' &&
        repo.language !== selectedFilter.language
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const { general } = selectedFilter;

      if (general === sorting.starsDescending.value) {
        return b.stargazers_count - a.stargazers_count;
      }

      if (general === sorting.alphabetical.value) {
        return a.name.localeCompare(b.name);
      }

      if (general === sorting.lastCommitDate.value) {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }

      return 0;
    });
};

export const formatDate = (d: string): string => {
  const date = new Date(d);
  return new Intl.DateTimeFormat('pt-br').format(date);
};
