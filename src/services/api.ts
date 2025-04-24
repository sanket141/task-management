import axios, { AxiosResponse } from 'axios';
import { Task } from '../types/task';

const baseURL = 'http://localhost:3001/api';

interface TasksResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class TaskService {
  static async getTasks(params: { page: number; limit: number }): Promise<TasksResponse> {
    try {
      const response = await axios.get<TasksResponse>(`${baseURL}/tasks`, { 
        params: {
          page: params.page,
          limit: params.limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  static async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      const response = await axios.post<Task>(`${baseURL}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  static async updateTask(task: Task): Promise<Task> {
    try {
      const response = await axios.put<Task>(`${baseURL}/tasks/${task.id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  static async deleteTask(id: string): Promise<void> {
    try {
      await axios.delete(`${baseURL}/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

// Add an interceptor to handle common errors
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server Error:', error.response.data);
      throw new Error(error.response.data.message || 'Server Error');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network Error - Please check your connection');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
      throw new Error('Error setting up the request');
    }
  }
);

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});