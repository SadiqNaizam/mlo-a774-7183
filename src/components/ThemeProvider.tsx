import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: 'light' | 'dark'; // Resolved theme
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const initialState: ThemeProviderState = {
  theme: 'light', // This will be overridden by initial effect
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as 'light' | 'dark' | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        return storedTheme;
      }
      if (defaultTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return defaultTheme as 'light' | 'dark'; // Assuming defaultTheme is 'light' or 'dark' if not 'system'
    } catch (e) {
      // localStorage or matchMedia might not be available in all environments (e.g., SSR)
      return 'light'; // Fallback for such cases
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.error('Failed to set theme in localStorage', e);
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme: setThemeState,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};