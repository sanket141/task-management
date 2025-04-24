import styled from 'styled-components';
import { Task } from '../../types/task';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.text.secondary};
`;

interface TableProps {
  tasks: Task[];
  sortField: keyof Task;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Task) => void;
  onTaskSelect: (task: Task) => void;
}

const Table: React.FC<TableProps> = ({
  tasks,
  sortField,
  sortDirection,
  onSort,
  onTaskSelect
}) => {
  if (!tasks.length) {
    return <EmptyState>No tasks found</EmptyState>;
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <tbody>
          {tasks.map(task => (
            <TableRow
              key={task.id}
              task={task}
              onViewDetails={() => onTaskSelect(task)}
            />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;