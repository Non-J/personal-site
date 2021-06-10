import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export enum ThemeMode {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export type ThemeContextType = {
  theme: ThemeMode,
  resultTheme: ThemeMode.light | ThemeMode.dark
  setTheme: (theme: ThemeMode) => void,
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeMode.system, resultTheme: ThemeMode.light, setTheme: () => ({}),
});

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [themeState, setThemeState] = useState(ThemeMode.system);
  const [resultTheme, setResultTheme] = useState<ThemeMode.light | ThemeMode.dark>(ThemeMode.light);

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

    setResultTheme(isDarkThemeMode ? ThemeMode.dark : ThemeMode.light);

    root.classList.remove(isDarkThemeMode ? 'light' : 'dark');
    root.classList.add(isDarkThemeMode ? 'dark' : 'light');
  };

  // Listen to system theme state changes
  useEffect(() => {
    const listener = () => {
      applyTheme(themeState);
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
    return (() => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
    });
  }, []);

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

  return (<ThemeContext.Provider value={{ theme: themeState, resultTheme, setTheme }}>
    {children}
  </ThemeContext.Provider>);
};