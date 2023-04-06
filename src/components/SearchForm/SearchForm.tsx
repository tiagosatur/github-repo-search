import { SyntheticEvent } from 'react';

interface SearchFormProps {
  searchTerm: string;
  onSubmit: (e?: SyntheticEvent) => void;
  onTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchForm = ({
  searchTerm,
  onSubmit,
  onTermChange,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className='search-form'>
      <input type='text' value={searchTerm} onChange={onTermChange} />
      <button type='submit'>Search</button>
    </form>
  );
};
