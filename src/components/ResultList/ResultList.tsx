import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { SearchResult } from '../../types';
import { ResultItem } from '../ResultItem/ResultItem';

interface SearchFiltersProps {
  show: boolean;
  list: SearchResult[];
}
export const ResultList = ({ list, show }: SearchFiltersProps) => {
  if (!show) {
    return null;
  }
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th maxWidth='50px'>Name</Th>
            <Th>Last Update</Th>
            <Th>Stars</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((item, i) => (
            <ResultItem key={item.name + i} repo={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ResultList;
