export const getSearchResults = (searchTerm: string) => {
  return fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
    method: 'GET',
    headers: {
      Accept: 'application.vnd.github.v3+json',
    },
  });
};
