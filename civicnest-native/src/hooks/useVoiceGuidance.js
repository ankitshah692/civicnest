import { useCallback, useEffect, useState } from "react";
import * as Speech from "expo-speech";
import { useAccessibility } from "../context/AccessibilityContext.js";

const useVoiceGuidance = () => {
  const { voiceGuidance } = useAccessibility();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    (text, options = {}) => {
      if (!voiceGuidance || !text) {
        return;
      }
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(text, {
        rate: options.rate || 0.85,
        pitch: options.pitch || 1,
        volume: options.volume || 1,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    },
    [voiceGuidance]
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  return { speak, stop, isSpeaking, enabled: voiceGuidance };
};

export default useVoiceGuidance;
