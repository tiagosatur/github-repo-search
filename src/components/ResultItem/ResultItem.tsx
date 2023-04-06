import { Tr, Td } from '@chakra-ui/react';
import { formatDate } from '../../util/filters';
import { SearchResult } from '../../types';

interface ResultItemProps {
  repo: SearchResult;
}

export const ResultItem = ({ repo }: ResultItemProps) => {
  return (
    <Tr>
      <Td>{repo.name}</Td>
      <Td>{formatDate(repo.updated_at)}</Td>
      <Td>{repo.stargazers_count} </Td>
    </Tr>
  );
};
