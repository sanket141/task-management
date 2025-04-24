import styled from 'styled-components';
import { useState } from 'react';
import { Task } from '../../types/task';
import { getStatusColor, getPriorityColor, formatDate } from '../../utils/taskUtils';
import ActionButton from '../common/ActionButton';
import { useAppDispatch } from '../../app/hooks';
import { updateTask, deleteTask } from '../../features/tasks/taskSlice';
import ConfirmationModal from '../common/ConfirmationModal';
import { useToast } from '../common/ToastProvider';

const Row = styled.tr`
  &:hover {
    background-color: ${({ theme }) => `${theme.text.primary}05`};
  }
`;

const Cell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  vertical-align: middle;
`;

const Description = styled(Cell)`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  max-width: 300px;
`;

const Badge = styled.span<{ color: string }>`
  background-color: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 500;
  display: inline-block;
`;

const ActionsCell = styled(Cell)`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  width: 120px;
  text-align: right;
  white-space: nowrap;
  
  > * {
    margin: 0 ${({ theme }) => theme.spacing.xs};
    &:first-child { margin-left: 0; }
    &:last-child { margin-right: 0; }
  }
`;

interface TableRowProps {
  task: Task;
  onViewDetails: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ task, onViewDetails }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = async () => {
    const newStatus = task.status === 'completed' ? 'inProgress' : 'completed';
    const completedDate = newStatus === 'completed' ? new Date().toISOString() : undefined;

    try {
      await dispatch(updateTask({
        ...task,
        status: newStatus,
        completedDate,
        updatedAt: new Date().toISOString()
      })).unwrap();

      toast.show({
        type: 'success',
        message: `Task marked as ${newStatus === 'completed' ? 'completed' : 'in progress'}`
      });
    } catch (error) {
      toast.show({
        type: 'error',
        message: 'Failed to update task status'
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteTask(task.id)).unwrap();
      toast.show({
        type: 'success',
        message: 'Task deleted successfully'
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.show({
        type: 'error',
        message: 'Failed to delete task'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Row>
        <Cell>{task.title}</Cell>
        <Description>{task.description}</Description>
        <Cell>
          <Badge color={getStatusColor(task.status)}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
        </Cell>
        <Cell>
          <Badge color={getPriorityColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </Cell>
        <Cell>{formatDate(task.dueDate)}</Cell>
        <Cell>{task.estimatedHours}h</Cell>
        <Cell>{task.assignee}</Cell>
        <ActionsCell>
          <ActionButton
            onClick={handleToggleStatus}
            tooltip={task.status === 'completed' ? 'Mark as In Progress' : 'Mark as Completed'}
            variant={task.status === 'completed' ? 'warning' : 'success'}
          >
            {task.status === 'completed' ? '↺' : '✓'}
          </ActionButton>

          <ActionButton
            onClick={onViewDetails}
            tooltip="View Details"
            variant="primary"
          >
            👁
          </ActionButton>

          <ActionButton
            onClick={() => setIsDeleteModalOpen(true)}
            tooltip="Delete Task"
            variant="danger"
          >
            🗑
          </ActionButton>
        </ActionsCell>
      </Row>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  );
};

export default TableRow;