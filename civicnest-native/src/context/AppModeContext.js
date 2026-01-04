import { createContext, useContext, useMemo, useState } from "react";

const AppModeContext = createContext(null);

export const AppModeProvider = ({ children }) => {
  const [mode, setMode] = useState("app");

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode]
  );

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>;
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error("useAppMode must be used within AppModeProvider");
  }
  return context;
};
