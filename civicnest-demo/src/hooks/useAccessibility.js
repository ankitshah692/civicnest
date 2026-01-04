import { useAccessibilityContext } from "../context/AccessibilityContext.jsx";

const useAccessibility = () => {
  return useAccessibilityContext();
};

export default useAccessibility;
