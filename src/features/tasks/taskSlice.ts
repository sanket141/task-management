import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskPriority } from '../../types/task';
import { TaskService } from '../../services/api';

interface FetchTasksParams {
  page: number;
  limit: number;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params: FetchTasksParams) => {
    try {
      const response = await TaskService.getTasks(params);
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await TaskService.createTask(task);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    const response = await TaskService.updateTask(task);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await TaskService.deleteTask(id);
    return id;
  }
);

interface TaskState {
  tasks: Task[];
  loading: boolean;
  loadingMore: boolean;
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
  pagination: {
    currentPage: number;
    totalItems: number;
    hasMore: boolean;
  };
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  loadingMore: false,
  error: null,
  selectedTask: null,
  filters: {
    status: [],
    priority: [],
    searchQuery: ''
  },
  sort: {
    field: 'dueDate',
    direction: 'asc'
  },
  pagination: {
    currentPage: 1,
    totalItems: 0,
    hasMore: true
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<TaskStatus[]>) => {
      state.filters.status = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<TaskPriority[]>) => {
      state.filters.priority = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<{
      field: keyof Task;
      direction: 'asc' | 'desc';
    }>) => {
      state.sort = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { page } = action.meta.arg;
        if (page === 1) {
          state.tasks = action.payload.data;
          state.loading = false;
        } else {
          state.tasks = [...state.tasks, ...action.payload.data];
          state.loadingMore = false;
        }

        state.pagination = {
          currentPage: action.payload.page,
          totalItems: action.payload.total,
          hasMore: action.payload.hasMore
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  }
});

export const {
  setStatusFilter,
  setPriorityFilter,
  setSearchQuery,
  setSortConfig,
  setSelectedTask
} = taskSlice.actions;

export default taskSlice.reducer;