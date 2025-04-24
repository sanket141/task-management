const baseTheme = {
  typography: {
    h1: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '1.2',
    },
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    small: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.5',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05)',
  },
};

export const lightTheme = {
  ...baseTheme,
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  surface: '#FFFFFF',
  background: '#F2F2F7',
  border: '#C6C6C8',
  text: {
    primary: '#000000',
    secondary: '#8E8E93',
    disabled: '#C7C7CC',
  },
};

export const darkTheme = {
  ...baseTheme,
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  success: '#32D74B',
  error: '#FF453A',
  warning: '#FF9F0A',
  surface: '#1C1C1E',
  background: '#000000',
  border: '#38383A',
  text: {
    primary: '#FFFFFF',
    secondary: '#98989D',
    disabled: '#48484A',
  },
};

export type Theme = typeof lightTheme;

// For backwards compatibility
export const theme = lightTheme;