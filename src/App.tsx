import { SyntheticEvent, useState } from 'react';
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

  const onTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (!searchTerm) return;

    try {
      const res = await getSearchResults(searchTerm);
      if (!res.ok) throw new Error('Network error');
      const parse = await res.json();
      setResults({ list: parse.items, count: parse.total_count });
    } catch (e: unknown) {
      setSearchError(e instanceof Error ? e.message : String(e));
    }
  };

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
      <ul>
        {searchResults.list.map((item, i) => (
          <div key={item.name + i}>{item.name}</div>
        ))}
      </ul>
    </div>
  );
}

export default App;
