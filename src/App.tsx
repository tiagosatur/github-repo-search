import { SyntheticEvent, useState, useMemo } from 'react';
import { getSearchResults } from './api';
import octocat from '../public/octocat.svg';
import './App.css';

interface SearchResult {
  owner: {
    login: string;
  };
  stargazers_count: number;
  language: string | null;
  name: string;
  description: string;
}

const sort = {
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

interface SearchResult {
  owner: {
    login: string;
  };
  stargazers_count: number;
  language: string | null;
  name: string;
  description: string;
  updated_at: string;
}

interface SelectedFilter {
  language: string;
  general: string;
}

const getLanguages = (searchResults: SearchResult[]): string[] => {
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

const getFilteredResults = (
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

      if (general === sort.starsDescending.value) {
        return b.stargazers_count - a.stargazers_count;
      }

      if (general === sort.alphabetical.value) {
        console.log(a.name, ' - ', b.name, b.name.localeCompare(a.name));

        return a.name.localeCompare(b.name);
      }

      if (general === sort.lastCommitDate.value) {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      }

      return 0;
    });
};

const formatDate = (d: string): string => {
  const date = new Date(d);
  return new Intl.DateTimeFormat('pt-br').format(date);
};

function App() {
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
    general: sort.alphabetical.value,
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

  return (
    <div className='App'>
      <h1>
        <div>
          <img src={octocat} alt='Your SVG' height={150} width={150} />
        </div>
        Github Repo Search
      </h1>
      <form onSubmit={onSubmit} className='search-form'>
        <input type='text' value={searchTerm} onChange={onTermChange} />
        <button type='submit'>Search</button>
      </form>
      <div className='error'>{searchError}</div>

      <select
        name='language'
        value={selectedFilter.language}
        onChange={onFilterChange}
      >
        <option value='None'>Select a language</option>
        {languages.map((lang, i) => (
          <option value={lang} key={lang + i}>
            {lang}
          </option>
        ))}
      </select>

      <select
        value={selectedFilter.general}
        name='general'
        onChange={onFilterChange}
      >
        {Object.values(sort).map((item) => {
          return <option value={item.value}>{item.label}</option>;
        })}
      </select>

      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {filteredSortedList.map((item, i) => (
            <div key={item.name + i}>
              <span>{item.name} - </span>
              <span>{item.stargazers_count} - </span>
              <span>{formatDate(item.updated_at)}</span>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
