import styled from 'styled-components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTasks } from '../features/tasks/taskSlice';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  groupByHourRanges, 
  getCompletedTasksData, 
  getDueTasksData 
} from '../utils/taskUtils';

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: repeat(2, 1fr);
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  grid-column: 1 / -1;
`;

const ChartTitle = styled.h2`
  ${({ theme }) => theme.typography.h2};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${({ theme }) => theme.text.secondary};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const DashboardView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);

  useEffect(() => {
    // Load all tasks for dashboard view with a larger limit
    dispatch(fetchTasks({ page: 1, limit: 50 }));
  }, [dispatch]);

  // Process data for charts
  const taskCompletionData = Object.entries(getCompletedTasksData(tasks))
    .map(([date, count]) => ({ date, count }));

  const taskDueData = Object.entries(getDueTasksData(tasks))
    .map(([date, count]) => ({ date, count }));

  const estimationRangeData = groupByHourRanges(tasks);

  const COLORS = {
    completed: '#34C759',
    due: '#007AFF',
    estimation: ['#FF9500', '#5856D6', '#FF3B30']
  };

  if (error) {
    return <ErrorMessage>Error loading dashboard: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Dashboard</Title>
      
      <Card>
        <ChartTitle>Tasks Completed per Day</ChartTitle>
        {loading ? (
          <LoadingOverlay>Loading chart data...</LoadingOverlay>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 'auto']} allowDecimals={false} />
              <Tooltip 
                formatter={(value) => [`${value} tasks`, 'Completed']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={COLORS.completed}
                strokeWidth={2}
                name="Completed Tasks"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card>
        <ChartTitle>Tasks Due per Day</ChartTitle>
        {loading ? (
          <LoadingOverlay>Loading chart data...</LoadingOverlay>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskDueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 'auto']} allowDecimals={false} />
              <Tooltip 
                formatter={(value) => [`${value} tasks`, 'Due']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={COLORS.due}
                strokeWidth={2}
                name="Due Tasks"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card>
        <ChartTitle>Estimated Hours Distribution</ChartTitle>
        {loading ? (
          <LoadingOverlay>Loading chart data...</LoadingOverlay>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estimationRangeData}
                dataKey="hours"
                nameKey="range"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ range, hours }) => `${range}: ${hours}h`}
              >
                {estimationRangeData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS.estimation[index % COLORS.estimation.length]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} hours`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>
    </Container>
  );
};

export default DashboardView;