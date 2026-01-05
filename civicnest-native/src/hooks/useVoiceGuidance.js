import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Speech from "expo-speech";
import { useAccessibility } from "../context/AccessibilityContext.js";

const useVoiceGuidance = () => {
  const { voiceGuidance } = useAccessibility();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpeech, setHasSpeech] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        if (isMounted) {
          setHasSpeech(Array.isArray(voices) && voices.length > 0);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasSpeech(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const speak = useCallback(
    (text, options = {}) => {
      if (!voiceGuidance || !text) {
        return;
      }
      if (!hasSpeech) {
        Alert.alert("Voice guidance unavailable", "No text-to-speech voice is available on this device.");
        return;
      }
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(text, {
        rate: options.rate || 0.85,
        pitch: options.pitch || 1,
        volume: options.volume || 1,
        language: options.language || "en-US",
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    },
    [hasSpeech, voiceGuidance]
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    if (!voiceGuidance) {
      Speech.stop();
      setIsSpeaking(false);
    }
    return () => Speech.stop();
  }, [voiceGuidance]);

  return { speak, stop, isSpeaking, enabled: voiceGuidance, available: hasSpeech };
};

export default useVoiceGuidance;
