import styled from 'styled-components';
import { Task } from '../../types/task';
import { getStatusColor, getPriorityColor, formatDate } from '../../utils/taskUtils';

interface DrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
`;

const DrawerHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  &:hover {
    color: ${({ theme }) => theme.text.primary};
    background-color: ${({ theme }) => `${theme.text.primary}10`};
  }
`;

const DrawerContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.h2};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Badge = styled.span<{ color: string }>`
  background-color: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  ${({ theme }) => theme.typography.small};
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.text.primary};
  ${({ theme }) => theme.typography.body};
`;

const Drawer: React.FC<DrawerProps> = ({ task, isOpen, onClose }) => {
  if (!task) return null;

  return (
    <DrawerContainer isOpen={isOpen}>
      <DrawerHeader>
        <Title>Task Details</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </DrawerHeader>
      <DrawerContent>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        
        <div>
          <Badge color={getStatusColor(task.status)}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
          <Badge color={getPriorityColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>

        <InfoGrid>
          <InfoLabel>Assignee</InfoLabel>
          <InfoValue>{task.assignee}</InfoValue>

          <InfoLabel>Due Date</InfoLabel>
          <InfoValue>{formatDate(task.dueDate)}</InfoValue>

          <InfoLabel>Estimated Hours</InfoLabel>
          <InfoValue>{task.estimatedHours}h</InfoValue>

          <InfoLabel>Created</InfoLabel>
          <InfoValue>{formatDate(task.createdAt)}</InfoValue>

          <InfoLabel>Last Updated</InfoLabel>
          <InfoValue>{formatDate(task.updatedAt)}</InfoValue>
        </InfoGrid>
      </DrawerContent>
    </DrawerContainer>
  );
};

export default Drawer;