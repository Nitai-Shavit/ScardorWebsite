import { createContext } from "react";
import useToggle from "../../Hooks/useToggle";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, ToggleDarkMode] = useToggle();

  return (
    <DarkModeContext.Provider value={[darkMode, ToggleDarkMode]}>
      {children}
    </DarkModeContext.Provider>
  );
};