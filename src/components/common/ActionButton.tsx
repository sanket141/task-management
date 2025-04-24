import styled from 'styled-components';
import { ReactNode, useState, useRef, useEffect, useCallback } from 'react';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface ButtonProps {
  variant?: ButtonVariant;
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Tooltip = styled.div<{ isVisible: boolean }>`
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  position: fixed;
  background-color: ${({ theme }) => theme.text.primary};
  color: ${({ theme }) => theme.surface};
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.small.fontSize};
  white-space: nowrap;
  z-index: 1000;
`;

const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme, variant = 'default' }) => {
    switch (variant) {
      case 'primary':
        return `${theme.primary}15`;
      case 'success':
        return `${theme.success}15`;
      case 'warning':
        return `${theme.warning}15`;
      case 'danger':
        return `${theme.error}15`;
      default:
        return `${theme.text.primary}05`;
    }
  }};
  color: ${({ theme, variant = 'default' }) => {
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'success':
        return theme.success;
      case 'warning':
        return theme.warning;
      case 'danger':
        return theme.error;
      default:
        return theme.text.primary;
    }
  }};
  border-color: ${({ theme, variant = 'default' }) => {
    switch (variant) {
      case 'primary':
        return `${theme.primary}30`;
      case 'success':
        return `${theme.success}30`;
      case 'warning':
        return `${theme.warning}30`;
      case 'danger':
        return `${theme.error}30`;
      default:
        return theme.border;
    }
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  &:hover {
    background-color: ${({ theme, variant = 'default' }) => {
      switch (variant) {
        case 'primary':
          return `${theme.primary}25`;
        case 'success':
          return `${theme.success}25`;
        case 'warning':
          return `${theme.warning}25`;
        case 'danger':
          return `${theme.error}25`;
        default:
          return `${theme.text.primary}10`;
      }
    }};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  tooltip?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  tooltip,
  variant = 'default',
  disabled = false,
  type = 'button'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateTooltipPosition = useCallback(() => {
    if (buttonRef.current && showTooltip) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 30,  // Position above the button
        left: rect.left + (rect.width / 2)  // Center horizontally
      });
    }
  }, [showTooltip]);

  useEffect(() => {
    if (showTooltip) {
      updateTooltipPosition();
      window.addEventListener('scroll', updateTooltipPosition);
      window.addEventListener('resize', updateTooltipPosition);
    }
    
    return () => {
      window.removeEventListener('scroll', updateTooltipPosition);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [showTooltip, updateTooltipPosition]);

  return (
    <TooltipWrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Button
        ref={buttonRef}
        onClick={onClick}
        variant={variant}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
      {tooltip && (
        <Tooltip
          isVisible={showTooltip}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip}
        </Tooltip>
      )}
    </TooltipWrapper>
  );
};

export default ActionButton;