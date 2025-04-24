import styled from 'styled-components';
import { Task } from '../../types/task';

const HeaderRow = styled.tr`
  background-color: ${({ theme }) => `${theme.text.primary}05`};
`;

const HeaderCell = styled.th<{ isSorted: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  color: ${({ theme, isSorted }) => 
    isSorted ? theme.primary : theme.text.primary};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SortIcon = styled.span<{ direction: 'asc' | 'desc' }>`
  margin-left: ${({ theme }) => theme.spacing.xs};
  display: inline-block;
  transform: ${({ direction }) => 
    direction === 'asc' ? 'rotate(-180deg)' : 'none'};
`;

interface Column {
  field: keyof Task;
  label: string;
  width?: string;
}

export const columns: Column[] = [
  { field: 'title', label: 'Title', width: '20%' },
  { field: 'description', label: 'Description', width: '25%' },
  { field: 'status', label: 'Status', width: '10%' },
  { field: 'priority', label: 'Priority', width: '10%' },
  { field: 'dueDate', label: 'Due Date', width: '10%' },
  { field: 'estimatedHours', label: 'Est. Hours', width: '10%' },
  { field: 'assignee', label: 'Assignee', width: '15%' }
];

interface TableHeaderProps {
  sortField: keyof Task;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Task) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort
}) => {
  return (
    <thead>
      <HeaderRow>
        {columns.map(({ field, label, width }) => (
          <HeaderCell
            key={field}
            onClick={() => onSort(field)}
            isSorted={field === sortField}
            style={{ width }}
          >
            {label}
            {field === sortField && (
              <SortIcon direction={sortDirection}>▼</SortIcon>
            )}
          </HeaderCell>
        ))}
        <HeaderCell 
          key="actions"
          isSorted={false}
          style={{ width: '100px' }}
        >
          Actions
        </HeaderCell>
      </HeaderRow>
    </thead>
  );
};

export default TableHeader;