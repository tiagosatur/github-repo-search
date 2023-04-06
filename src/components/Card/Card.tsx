import { formatDate } from '../../util/filters';
import { SearchResult } from '../../types';

interface CardProps {
  repo: SearchResult;
}

export const Card = ({ repo }: CardProps) => {
  return (
    <div>
      <span>{repo.name} - </span>
      <span>{repo.stargazers_count} - </span>
      <span>{formatDate(repo.updated_at)}</span>
    </div>
  );
};
