import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.error : 'transparent'
  };
  color: ${({ theme, variant }) => 
    variant === 'danger' ? '#ffffff' : theme.text.primary
  };
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'primary' | 'danger';
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  confirmVariant = 'danger',
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Content>
        {message}
      </Content>
      <Actions>
        <Button 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          variant={confirmVariant} 
          onClick={onConfirm}
          disabled={isLoading}
        >
          {confirmText}
        </Button>
      </Actions>
    </Modal>
  );
};

export default ConfirmationModal;