import { Task } from '../types/task';

const generateMockTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  const statuses = ['todo', 'inProgress', 'completed'] as const;
  const priorities = ['low', 'medium', 'high'] as const;
  const assignees = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson', 'Charlie Brown'];
  
  const baseDate = new Date('2024-04-01');
  
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdDate = new Date(baseDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const dueDate = new Date(createdDate.getTime() + (Math.random() * 20 + 5) * 24 * 60 * 60 * 1000);
    const completedDate = status === 'completed' 
      ? new Date(dueDate.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000)
      : undefined;

    const task: Task = {
      id: i.toString(),
      title: `Task ${i}: ${['Implement', 'Design', 'Test', 'Review', 'Update', 'Fix', 'Optimize'][Math.floor(Math.random() * 7)]} ${['Feature', 'Component', 'Module', 'Bug', 'Documentation', 'Performance', 'UI'][Math.floor(Math.random() * 7)]}`,
      description: `Detailed description for task ${i}. This is a ${status} task with ${priorities[Math.floor(Math.random() * priorities.length)]} priority.`,
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      dueDate: dueDate.toISOString(),
      estimatedHours: Math.floor(Math.random() * 12) + 1,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      createdAt: createdDate.toISOString(),
      updatedAt: completedDate?.toISOString() || createdDate.toISOString(),
      assignedDate: createdDate.toISOString(),
      completedDate: completedDate?.toISOString()
    };

    tasks.push(task);
  }

  // Sort by created date descending
  return tasks.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const mockTasks: Task[] = generateMockTasks(50);