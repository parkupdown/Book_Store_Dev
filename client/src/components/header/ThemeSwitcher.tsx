import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

export default function ThemeSwitcher() {
  const { themeName, toggleThemeName } = useContext(ThemeContext);

  return (
    <>
      <button onClick={toggleThemeName}>{themeName}</button>
    </>
  );
}
