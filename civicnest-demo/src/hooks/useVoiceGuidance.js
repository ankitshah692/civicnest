import { useCallback, useEffect, useState } from "react";
import { speakText, stopSpeech } from "../utils/textToSpeech.js";
import useAccessibility from "./useAccessibility.js";

const useVoiceGuidance = () => {
  const { voiceGuidance } = useAccessibility();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    (text, options = {}) => {
      if (!voiceGuidance || !text) {
        return;
      }
      setIsSpeaking(true);
      speakText(text, {
        ...options,
        onEnd: () => setIsSpeaking(false),
      });
    },
    [voiceGuidance]
  );

  const stop = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  return { speak, stop, isSpeaking, enabled: voiceGuidance };
};

export default useVoiceGuidance;
