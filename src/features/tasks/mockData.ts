import { Task } from '../../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement Dashboard Charts',
    description: 'Create visualizations for tasks completed, tasks due, and estimation hours',
    status: 'inProgress',
    priority: 'high',
    dueDate: '2024-04-30',
    estimatedHours: 8,
    assignee: 'John Doe',
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2024-04-20T10:00:00Z',
    assignedDate: '2024-04-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Design Task Table Component',
    description: 'Create a reusable table component with sorting and filtering capabilities',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-04-25',
    estimatedHours: 6,
    assignee: 'Jane Smith',
    createdAt: '2024-04-20T09:00:00Z',
    updatedAt: '2024-04-20T09:00:00Z',
    assignedDate: '2024-04-20T09:00:00Z'
  },
  {
    id: '3',
    title: 'Add Unit Tests',
    description: 'Write comprehensive unit tests for all components',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-05-01',
    estimatedHours: 4,
    assignee: 'John Doe',
    createdAt: '2024-04-20T11:00:00Z',
    updatedAt: '2024-04-20T11:00:00Z',
    assignedDate: '2024-04-20T11:00:00Z'
  },
  {
    id: '4',
    title: 'Implement Task Filtering',
    description: 'Add filtering functionality for task status and priority',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-04-22',
    estimatedHours: 3,
    assignee: 'Jane Smith',
    createdAt: '2024-04-19T15:00:00Z',
    updatedAt: '2024-04-20T14:00:00Z',
    assignedDate: '2024-04-19T15:00:00Z',
    completedDate: '2024-04-20T14:00:00Z'
  },
  {
    id: '5',
    title: 'Setup CI/CD Pipeline',
    description: 'Configure automated testing and deployment pipeline',
    status: 'inProgress',
    priority: 'low',
    dueDate: '2024-05-05',
    estimatedHours: 5,
    assignee: 'John Doe',
    createdAt: '2024-04-20T13:00:00Z',
    updatedAt: '2024-04-20T13:00:00Z',
    assignedDate: '2024-04-20T13:00:00Z'
  }
];