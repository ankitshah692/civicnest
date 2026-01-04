import { createContext, useContext, useMemo, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [state, setState] = useState({
    highContrast: false,
    textScale: "regular",
    voiceGuidance: true,
  });

  const value = useMemo(
    () => ({
      ...state,
      toggleContrast: () => setState((prev) => ({ ...prev, highContrast: !prev.highContrast })),
      toggleVoiceGuidance: () =>
        setState((prev) => ({ ...prev, voiceGuidance: !prev.voiceGuidance })),
      increaseTextSize: () =>
        setState((prev) => ({
          ...prev,
          textScale: prev.textScale === "regular" ? "large" : "xlarge",
        })),
      decreaseTextSize: () =>
        setState((prev) => ({
          ...prev,
          textScale: prev.textScale === "xlarge" ? "large" : "regular",
        })),
    }),
    [state]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};
