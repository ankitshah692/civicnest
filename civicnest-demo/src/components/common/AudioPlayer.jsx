import { Volume2, VolumeX } from "lucide-react";
import useVoiceGuidance from "../../hooks/useVoiceGuidance.js";

const AudioPlayer = ({ text, label = "Read aloud" }) => {
  const { speak, stop, isSpeaking, enabled } = useVoiceGuidance();

  const handleClick = () => {
    if (!enabled) {
      return;
    }
    if (isSpeaking) {
      stop();
      return;
    }
    speak(text);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full border-2 border-civic-teal px-4 py-2 font-semibold text-civic-teal hover:bg-teal-50"
      disabled={!enabled}
    >
      {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      {isSpeaking ? "Stop" : label}
    </button>
  );
};

export default AudioPlayer;
