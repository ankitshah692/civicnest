export const speakText = (text, options = {}) => {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 0.85;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }
  window.speechSynthesis.cancel();
};
