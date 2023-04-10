import { SyntheticEvent, useState, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { SearchResult, SelectedFilter } from '../../types';
import { getSearchResults } from '../../util/api';
import octocat from '../../../public/octocat.svg';

import { getFilteredResults, getLanguages, sorting } from '../../util/filters';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchFilters } from '../SearchFilters/SearchFilters';
import ResultList from '../ResultList/ResultList';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setResults] = useState<{
    count: number;
    list: SearchResult[];
  }>({
    count: 0,
    list: [],
  });
  const [searchError, setSearchError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    language: 'None',
    general: sorting.alphabetical.value,
  });

  const onTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (!searchTerm) return;

    try {
      setLoading(true);

      const res = await getSearchResults(searchTerm);
      if (!res.ok) throw new Error('Network error');
      const parse = await res.json();
      setResults({ list: parse.items, count: parse.total_count });
    } catch (e: unknown) {
      setSearchError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const languages = useMemo(
    () => getLanguages(searchResults.list),
    [searchResults.list]
  );

  const filteredSortedList = useMemo(
    () => getFilteredResults(searchResults.list, selectedFilter),
    [searchResults, selectedFilter]
  );

  const displayContent = searchResults.count > 0 && !isLoading;

  return (
    <div>
      <Box display='flez' justifyContent='center' marginBottom={8}>
        <h1>
          <img src={octocat} alt='Octocat icon' height={150} width={150} />
        </h1>
      </Box>
      <Box marginBottom={4} minWidth='100%'>
        <SearchForm
          searchTerm={searchTerm}
          onSubmit={onSubmit}
          onTermChange={onTermChange}
          isLoading={isLoading}
        />
      </Box>

      {searchError && <div className='error'>{searchError}</div>}

      <Box marginBottom={10}>
        <SearchFilters
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
          languages={languages}
          show={displayContent}
        />
      </Box>
      {displayContent && (
        <Box marginBottom={10} textAlign='left' color='gray.600'>
          We found {searchResults.count} results
        </Box>
      )}
      <Box marginBottom={10}>
        <ResultList list={filteredSortedList} show={displayContent} />
      </Box>
    </div>
  );
}

export default Search;
