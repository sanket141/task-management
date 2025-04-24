import styled from 'styled-components';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  setStatusFilter, 
  setPriorityFilter, 
  setSearchQuery, 
  setSortConfig,
  setSelectedTask,
  fetchTasks
} from '../features/tasks/taskSlice';
import { Task } from '../types/task';
import { filterTasks, sortTasks } from '../utils/taskUtils';
import Table from '../components/Table/Table';
import Filters from '../components/Filters/Filters';
import Drawer from '../components/Drawer/Drawer';
import TaskActions from '../components/TaskActions/TaskActions';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  height: calc(100vh - 64px); /* Subtract header height */
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.text.secondary};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const PAGE_SIZE = 20;

export const TableView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    tasks,
    loading,
    loadingMore,
    error,
    filters,
    sort,
    selectedTask,
    pagination
  } = useAppSelector(state => state.tasks);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadTasks = useCallback(async (pageNum: number) => {
    try {
      await dispatch(fetchTasks({ 
        page: pageNum, 
        limit: PAGE_SIZE 
      })).unwrap();
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadTasks(1);
  }, [loadTasks]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !pagination.hasMore || loadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollThreshold = 100; // pixels from bottom to trigger load

    if (scrollHeight - (scrollTop + clientHeight) < scrollThreshold) {
      loadTasks(pagination.currentPage + 1);
    }
  }, [pagination.hasMore, loadingMore, loadTasks, pagination.currentPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const filteredTasks = filterTasks(
    tasks,
    filters.status,
    filters.priority,
    filters.searchQuery
  );

  const sortedTasks = sortTasks(
    filteredTasks,
    sort.field,
    sort.direction
  );

  const handleSort = (field: keyof Task) => {
    dispatch(setSortConfig({
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleTaskSelect = (task: Task) => {
    dispatch(setSelectedTask(task));
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      dispatch(setSelectedTask(null));
    }, 300);
  };

  return (
    <Container>
      <Title>Task Management</Title>
      
      <Filters
        selectedStatus={filters.status}
        selectedPriority={filters.priority}
        searchQuery={filters.searchQuery}
        onStatusChange={(status) => dispatch(setStatusFilter(status))}
        onPriorityChange={(priority) => dispatch(setPriorityFilter(priority))}
        onSearchChange={(query) => dispatch(setSearchQuery(query))}
      />

      <TaskActions />

      <TableContainer ref={containerRef} onScroll={handleScroll}>
        {loading && !loadingMore && (
          <LoadingIndicator>Loading tasks...</LoadingIndicator>
        )}
        
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        
        {!loading && !error && sortedTasks.length === 0 && (
          <LoadingIndicator>No tasks found</LoadingIndicator>
        )}

        {sortedTasks.length > 0 && (
          <Table
            tasks={sortedTasks}
            sortField={sort.field}
            sortDirection={sort.direction}
            onSort={handleSort}
            onTaskSelect={handleTaskSelect}
          />
        )}

        {loadingMore && (
          <LoadingIndicator>Loading more tasks...</LoadingIndicator>
        )}
      </TableContainer>

      <Drawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Container>
  );
};

export default TableView;