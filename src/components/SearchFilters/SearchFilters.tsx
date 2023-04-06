import { Flex, Select } from '@chakra-ui/react';
import { sorting } from '../../util/filters';
import { SelectedFilter } from '../../types';

interface SearchFiltersProps {
  selectedFilter: SelectedFilter;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: string[];
  show: boolean;
}

export const SearchFilters = ({
  selectedFilter,
  onFilterChange,
  languages,
  show,
}: SearchFiltersProps) => {
  if (!show) {
    return null;
  }

  return (
    <Flex>
      <Select
        name='language'
        value={selectedFilter.language}
        onChange={onFilterChange}
        variant='filled'
        marginRight={4}
      >
        <option value='None'>Programming language</option>
        {languages.map((lang, i) => (
          <option value={lang} key={lang + i}>
            {lang}
          </option>
        ))}
      </Select>

      <Select
        value={selectedFilter.general}
        name='general'
        onChange={onFilterChange}
        variant='filled'
      >
        {Object.values(sorting).map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};
