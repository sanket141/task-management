import styled from 'styled-components';
import { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types/task';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => `${theme.text.disabled}15`};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => `${theme.text.disabled}15`};
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => `${theme.text.disabled}15`};
    cursor: not-allowed;
  }
`;

interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isLoading?: boolean;
}

const TaskForm = ({ initialData = {}, onSubmit, isLoading = false }: TaskFormProps) => {
  const now = new Date().toISOString();

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    status: initialData.status || 'todo' as TaskStatus,
    priority: initialData.priority || 'medium' as TaskPriority,
    dueDate: initialData.dueDate || new Date().toISOString().split('T')[0],
    estimatedHours: initialData.estimatedHours || 1,
    assignee: initialData.assignee || '',
    assignedDate: initialData.assignedDate || now,
    completedDate: initialData.completedDate
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'status' && value === 'completed' 
        ? { completedDate: new Date().toISOString() }
        : name === 'status' && value !== 'completed'
        ? { completedDate: undefined }
        : {})
    }));
  };

  return (
    <Form id="taskForm" onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter task description"
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="priority">Priority</Label>
        <Select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="estimatedHours">Estimated Hours</Label>
        <Input
          type="number"
          id="estimatedHours"
          name="estimatedHours"
          min="0"
          step="0.5"
          value={formData.estimatedHours}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="assignee">Assignee</Label>
        <Input
          id="assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          required
          placeholder="Enter assignee name"
          disabled={isLoading}
        />
      </FormGroup>
    </Form>
  );
};

export default TaskForm;