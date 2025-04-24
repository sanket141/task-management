import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ActionButton from './common/ActionButton';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => `${theme.text.primary}05`};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}10`};
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.background};
`;

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isDarkMode,
  onThemeToggle
}) => {
  return (
    <Container>
      <Header>
        <Title>Task Management</Title>
        <Nav>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
          <StyledNavLink to="/tasks">Tasks</StyledNavLink>
          <ActionButton
            onClick={onThemeToggle}
            tooltip={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            variant="default"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </ActionButton>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;