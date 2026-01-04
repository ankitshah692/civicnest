import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AccessibilityContext = createContext(null);

const STORAGE_KEY = "civicnest_accessibility";

const defaultState = {
  highContrast: false,
  textScale: "regular",
  voiceGuidance: true,
};

const readStorage = () => {
  if (typeof window === "undefined") {
    return defaultState;
  }
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...stored };
  } catch (error) {
    return defaultState;
  }
};

export const AccessibilityProvider = ({ children }) => {
  const [state, setState] = useState(readStorage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    root.classList.toggle("contrast-high", state.highContrast);
    root.classList.remove("text-scale-regular", "text-scale-large", "text-scale-xlarge");
    root.classList.add(`text-scale-${state.textScale}`);
  }, [state.highContrast, state.textScale]);

  const value = useMemo(
    () => ({
      highContrast: state.highContrast,
      textScale: state.textScale,
      voiceGuidance: state.voiceGuidance,
      toggleContrast: () => setState((prev) => ({ ...prev, highContrast: !prev.highContrast })),
      toggleVoiceGuidance: () =>
        setState((prev) => ({ ...prev, voiceGuidance: !prev.voiceGuidance })),
      increaseTextSize: () =>
        setState((prev) => {
          const next = prev.textScale === "regular" ? "large" : "xlarge";
          return { ...prev, textScale: next };
        }),
      decreaseTextSize: () =>
        setState((prev) => {
          const next = prev.textScale === "xlarge" ? "large" : "regular";
          return { ...prev, textScale: next };
        }),
    }),
    [state]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibilityContext must be used within AccessibilityProvider");
  }
  return context;
};
