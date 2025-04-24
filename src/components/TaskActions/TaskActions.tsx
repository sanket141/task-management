import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createTask } from '../../features/tasks/taskSlice';
import ActionButton from '../common/ActionButton';
import Modal from '../common/Modal';
import TaskForm from '../TaskForm';
import { useToast } from '../common/ToastProvider';
import { Task } from '../../types/task';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TaskActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      setIsModalOpen(false);
      toast.show({
        type: 'success',
        message: 'Task created successfully'
      });
    } catch (error) {
      toast.show({
        type: 'error',
        message: 'Failed to create task'
      });
    }
  };

  return (
    <Container>
      <ActionButton
        onClick={() => setIsModalOpen(true)}
        variant="primary"
        tooltip="Create New Task"
      >
        + Add Task
      </ActionButton>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        formId="taskForm"
      >
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </Container>
  );
};

export default TaskActions;