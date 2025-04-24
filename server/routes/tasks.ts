import express from 'express';
import { mockTasks } from '../data/mockTasks';
import { Task } from '../types/task';

const router = express.Router();

// GET /api/tasks
router.get('/', (req, res) => {
  try {
    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    
    // Calculate total pages and tasks
    const totalTasks = mockTasks.length;
    
    // If pagination is requested
    if (pageNum > 0 && limitNum > 0) {
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = Math.min(startIndex + limitNum, totalTasks);
      const paginatedTasks = mockTasks.slice(startIndex, endIndex);
      
      res.json({
        data: paginatedTasks,
        total: totalTasks,
        page: pageNum,
        limit: limitNum,
        hasMore: endIndex < totalTasks
      });
    } else {
      // Return all tasks if no pagination
      res.json({
        data: mockTasks,
        total: totalTasks,
        page: 1,
        limit: totalTasks,
        hasMore: false
      });
    }
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

// POST /api/tasks
router.post('/', (req, res) => {
  try {
    const task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    
    const newTask: Task = {
      ...task,
      id: (mockTasks.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockTasks.unshift(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask: Task = req.body;
    
    const index = mockTasks.findIndex(task => task.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    mockTasks[index] = {
      ...updatedTask,
      updatedAt: new Date().toISOString()
    };

    res.json(mockTasks[index]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = mockTasks.findIndex(task => task.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    mockTasks.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

export default router;