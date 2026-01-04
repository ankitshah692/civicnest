import { useEffect, useState } from "react";

const SessionTimer = ({ duration = 90, onTimeout }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeout) {
            onTimeout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-full bg-white/80 px-4 py-2 text-senior-sm font-semibold text-civic-navy shadow-sm">
      Session: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default SessionTimer;
