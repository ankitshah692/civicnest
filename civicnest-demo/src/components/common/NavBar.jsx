import { Link, useLocation } from "react-router-dom";
import { Ear, Home, Minus, Plus, SunMoon } from "lucide-react";
import useAccessibility from "../../hooks/useAccessibility.js";

const NavBar = ({ mode = "app" }) => {
  const location = useLocation();
  const {
    highContrast,
    textScale,
    voiceGuidance,
    toggleContrast,
    toggleVoiceGuidance,
    increaseTextSize,
    decreaseTextSize,
  } = useAccessibility();

  const basePath = mode === "kiosk" ? "/kiosk" : "/app";
  const isHome = location.pathname === `${basePath}/home`;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur surface-panel">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-civic-navy text-white font-bold">
          CN
        </div>
        <div>
          <p className="font-display text-senior-lg text-civic-navy">CivicNest</p>
          <p className="text-senior-sm text-slate-600">Securing the future with the past</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-senior-sm">
        {!isHome && (
          <Link
            to={`${basePath}/home`}
            className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 font-semibold text-civic-navy hover:bg-civic-light"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
        )}
        <button
          type="button"
          onClick={toggleContrast}
          className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 font-semibold text-civic-navy hover:bg-civic-light"
        >
          <SunMoon className="h-5 w-5" />
          {highContrast ? "Standard" : "High Contrast"}
        </button>
        <div className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-3 py-2">
          <button
            type="button"
            onClick={decreaseTextSize}
            className="rounded-full p-1 hover:bg-civic-light"
            aria-label="Decrease text size"
          >
            <Minus className="h-5 w-5 text-civic-navy" />
          </button>
          <span className="font-semibold text-civic-navy capitalize">{textScale}</span>
          <button
            type="button"
            onClick={increaseTextSize}
            className="rounded-full p-1 hover:bg-civic-light"
            aria-label="Increase text size"
          >
            <Plus className="h-5 w-5 text-civic-navy" />
          </button>
        </div>
        <button
          type="button"
          onClick={toggleVoiceGuidance}
          className="flex items-center gap-2 rounded-full border-2 border-civic-teal px-4 py-2 font-semibold text-civic-teal hover:bg-teal-50"
        >
          <Ear className="h-5 w-5" />
          {voiceGuidance ? "Voice On" : "Voice Off"}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
