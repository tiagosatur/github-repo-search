import { SyntheticEvent } from 'react';
import { Button, Input, Flex } from '@chakra-ui/react';

interface SearchFormProps {
  searchTerm: string;
  onSubmit: (e?: SyntheticEvent) => void;
  onTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const SearchForm = ({
  searchTerm,
  onSubmit,
  onTermChange,
  isLoading,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className='search-form'>
      <Flex>
        <Input
          type='text'
          value={searchTerm}
          onChange={onTermChange}
          marginRight={2}
          placeholder='Find Github Repositories'
        />
        <Button
          type='submit'
          backgroundColor='red.400'
          color='white'
          isLoading={isLoading}
        >
          Search
        </Button>
      </Flex>
    </form>
  );
};
