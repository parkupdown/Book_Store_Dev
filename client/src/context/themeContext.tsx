import { createContext } from "react";
import { ThemeName, getTheme } from "../style/theme";
import { ReactNode } from "react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";
import { useEffect } from "react";

interface State {
  themeName: ThemeName;
  toggleThemeName: () => void;
}
const DEFAULT_THEME_NAME = "light";
const THEME_LOCAL_STORAGE_KEY = "book_store_theme";

export const state = {
  themeName: "light" as ThemeName,
  toggleThemeName: () => {},
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleThemeName = () => {
    setThemeName(
      themeName === DEFAULT_THEME_NAME ? "dark" : DEFAULT_THEME_NAME
    );
    localStorage.setItem(
      THEME_LOCAL_STORAGE_KEY,
      themeName === DEFAULT_THEME_NAME ? "dark" : DEFAULT_THEME_NAME
    );
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCAL_STORAGE_KEY
    ) as ThemeName;
    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleThemeName }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
