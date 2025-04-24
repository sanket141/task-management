import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import App from './App';

test('renders app navigation', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
  
  const dashboardLink = screen.getByText(/dashboard/i);
  const tasksLink = screen.getByText(/tasks/i);
  
  expect(dashboardLink).toBeInTheDocument();
  expect(tasksLink).toBeInTheDocument();
});