export type TaskStatus = 'todo' | 'inProgress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  estimatedHours: number;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  assignedDate: string;
  completedDate?: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
  filters: {
    status: TaskStatus[];
    priority: TaskPriority[];
    searchQuery: string;
  };
  sort: {
    field: keyof Task;
    direction: 'asc' | 'desc';
  };
}