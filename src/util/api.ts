export const getSearchResults = (searchTerm: string) => {
  const encodedURI = encodeURIComponent(searchTerm);
  return fetch(`https://api.github.com/search/repositories?q=${encodedURI}`, {
    method: 'GET',
    headers: {
      Accept: 'application.vnd.github.v3+json',
    },
  });
};
