import useVoiceGuidance from "../../hooks/useVoiceGuidance.js";

const BigButton = ({
  icon,
  label,
  onClick,
  variant = "primary",
  size = "large",
  audioLabel,
  disabled = false,
}) => {
  const { speak } = useVoiceGuidance();

  const handleFocus = () => {
    if (audioLabel) {
      speak(audioLabel);
    }
  };

  const classes = [
    "big-button flex items-center justify-center gap-3 rounded-xl px-6 font-semibold shadow-sm",
    "transition-all focus-visible:outline-none",
    size === "large" ? "text-senior-lg" : "text-senior-base",
    variant === "primary" ? "bg-civic-navy text-white hover:bg-civic-blue" : "",
    variant === "secondary" ? "bg-civic-teal text-white hover:bg-civic-blue" : "",
    variant === "outline"
      ? "border-2 border-civic-navy text-civic-navy hover:bg-civic-light"
      : "",
    disabled ? "opacity-60 cursor-not-allowed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      onFocus={handleFocus}
      disabled={disabled}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default BigButton;
