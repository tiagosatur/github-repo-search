import { Tr, Td, Link } from '@chakra-ui/react';
import { formatDate } from '../../util/filters';
import { SearchResult } from '../../types';

interface ResultItemProps {
  repo: SearchResult;
}

export const ResultItem = ({ repo }: ResultItemProps) => {
  return (
    <Tr>
      <Td>
        <Link
          href={repo.html_url}
          target='_blank'
          display='block'
          title='Visit repository'
        >
          {repo.name}
        </Link>
      </Td>
      <Td>{formatDate(repo.updated_at)}</Td>
      <Td>{repo.stargazers_count} </Td>
    </Tr>
  );
};
