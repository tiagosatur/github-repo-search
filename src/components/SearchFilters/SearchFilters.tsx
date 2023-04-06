import { sorting } from '../../util/filters';
import { SelectedFilter } from '../../types';

interface SearchFiltersProps {
  selectedFilter: SelectedFilter;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: string[];
}

export const SearchFilters = ({
  selectedFilter,
  onFilterChange,
  languages,
}: SearchFiltersProps) => {
  return (
    <div>
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
        {Object.values(sorting).map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
