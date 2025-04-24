import styled from 'styled-components';
import { TaskStatus, TaskPriority } from '../../types/task';
import { getStatusColor, getPriorityColor } from '../../utils/taskUtils';

interface FiltersProps {
  selectedStatus: TaskStatus[];
  selectedPriority: TaskPriority[];
  searchQuery: string;
  onStatusChange: (status: TaskStatus[]) => void;
  onPriorityChange: (priority: TaskPriority[]) => void;
  onSearchChange: (query: string) => void;
}

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterButton = styled.button<{ isSelected: boolean; color: string }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ isSelected, color }) =>
    isSelected ? `${color}15` : 'transparent'};
  color: ${({ isSelected, color, theme }) =>
    isSelected ? color : theme.text.secondary};
  border: 1px solid ${({ isSelected, color, theme }) =>
    isSelected ? color : theme.border};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ color }) => `${color}10`};
    border-color: ${({ color }) => color};
    color: ${({ color }) => color};
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text.primary};
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
`;

const statuses: TaskStatus[] = ['todo', 'inProgress', 'completed'];
const priorities: TaskPriority[] = ['high', 'medium', 'low'];

const Filters: React.FC<FiltersProps> = ({
  selectedStatus,
  selectedPriority,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}) => {
  const toggleStatus = (status: TaskStatus) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const togglePriority = (priority: TaskPriority) => {
    if (selectedPriority.includes(priority)) {
      onPriorityChange(selectedPriority.filter((p) => p !== priority));
    } else {
      onPriorityChange([...selectedPriority, priority]);
    }
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        {statuses.map((status) => (
          <FilterButton
            key={status}
            isSelected={selectedStatus.includes(status)}
            color={getStatusColor(status)}
            onClick={() => toggleStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup>
        {priorities.map((priority) => (
          <FilterButton
            key={priority}
            isSelected={selectedPriority.includes(priority)}
            color={getPriorityColor(priority)}
            onClick={() => togglePriority(priority)}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </FilterButton>
        ))}
      </FilterGroup>

      <SearchInput
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </FiltersContainer>
  );
};

export default Filters;