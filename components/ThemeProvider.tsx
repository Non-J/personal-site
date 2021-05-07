import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export enum ThemeMode {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export type ThemeContextType = {
  theme: ThemeMode,
  setTheme: (theme: ThemeMode) => void,
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [themeState, setThemeState] = useState(ThemeMode.system);

  // Load initial theme preference from localstorage
  useEffect(() => {
    const theme = window.localStorage.getItem('theme-preference');
    if (theme && theme in ThemeMode) {
      setThemeState(theme as ThemeMode);
    }
  }, []);

  // Applies appropriate class to root element
  const applyTheme = (theme: ThemeMode) => {
    const root = window.document.documentElement;

    let isDarkThemeMode = theme === ThemeMode.dark;
    if (theme == ThemeMode.system) {
      isDarkThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    root.classList.remove(isDarkThemeMode ? 'light' : 'dark');
    root.classList.add(isDarkThemeMode ? 'dark' : 'light');
  };

  useEffect(
    () => {
      applyTheme(themeState);
    },
    [themeState],
  );

  // Set the theme and save preference to localStorage
  // This function is intended to be consumed by other components
  const setTheme = (theme: ThemeMode) => {
    setThemeState(theme);
    window.localStorage.setItem('theme-preference', theme);
  };

  return (<ThemeContext.Provider value={{ theme: themeState, setTheme }}>
    {children}
  </ThemeContext.Provider>);
};