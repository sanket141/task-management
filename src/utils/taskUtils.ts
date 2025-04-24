import { Task, TaskStatus, TaskPriority } from '../types/task';

// Format date to display in a consistent way
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get color for task status
export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'completed':
      return '#34C759'; // green
    case 'inProgress':
      return '#5856D6'; // indigo
    default:
      return '#FF9500'; // orange
  }
};

// Get color for task priority
export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return '#FF3B30'; // red
    case 'medium':
      return '#FF9500'; // orange
    default:
      return '#5856D6'; // indigo
  }
};

// Filter tasks based on status, priority and search query
export const filterTasks = (
  tasks: Task[],
  statusFilter: TaskStatus[],
  priorityFilter: TaskPriority[],
  searchQuery: string
): Task[] => {
  return tasks.filter(task => {
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(task.status);
    const matchesPriority = priorityFilter.length === 0 || priorityFilter.includes(task.priority);
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });
};

// Sort tasks by a given field and direction
export const sortTasks = (
  tasks: Task[],
  field: keyof Task,
  direction: 'asc' | 'desc'
): Task[] => {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (['dueDate', 'createdAt', 'updatedAt', 'assignedDate', 'completedDate'].includes(field)) {
        // Handle date fields
        comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
      } else {
        // Handle other string fields
        comparison = aValue.localeCompare(bValue);
      }
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
};

// Get date ranges for charts with sorting
export const getDateRanges = (dates: string[]): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};
  dates.forEach(date => {
    const formattedDate = formatDate(date);
    counts[formattedDate] = (counts[formattedDate] || 0) + 1;
  });
  
  // Sort dates
  const sortedEntries = Object.entries(counts).sort((a, b) => 
    new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  return Object.fromEntries(sortedEntries);
};

// Group tasks by hour ranges
export const groupByHourRanges = (tasks: Task[]) => {
  return tasks.reduce((acc: { range: string; hours: number }[], task) => {
    const hours = task.estimatedHours;
    let range = '0-4 hours';
    if (hours > 8) {
      range = '8+ hours';
    } else if (hours > 4) {
      range = '5-8 hours';
    }

    const existing = acc.find(item => item.range === range);
    if (existing) {
      existing.hours += hours;
    } else {
      acc.push({ range, hours });
    }
    return acc;
  }, []);
};

// Get chart data for completed tasks
export const getCompletedTasksData = (tasks: Task[]) => {
  const completedTasks = tasks.filter(task => task.completedDate);
  return getDateRanges(completedTasks.map(task => task.completedDate!));
};

// Get chart data for due tasks
export const getDueTasksData = (tasks: Task[]) => {
  return getDateRanges(tasks.map(task => task.dueDate));
};