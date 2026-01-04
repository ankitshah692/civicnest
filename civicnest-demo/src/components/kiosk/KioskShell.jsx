import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import SessionTimer from "./SessionTimer.jsx";
import Modal from "../common/Modal.jsx";
import NavBar from "../common/NavBar.jsx";

const KioskShell = () => {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const warningTimer = setTimeout(() => setShowWarning(true), 60000);
    return () => clearTimeout(warningTimer);
  }, [resetKey]);

  const handleTimeout = () => {
    navigate("/kiosk/home");
    setShowWarning(false);
    setResetKey((prev) => prev + 1);
  };

  const resetSession = () => {
    setShowWarning(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col rounded-[28px] border-4 border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="rounded-full bg-civic-navy px-4 py-2 text-senior-sm font-semibold text-white">
            Public Kiosk • No login required
          </div>
          <SessionTimer key={resetKey} onTimeout={handleTimeout} />
          <button
            type="button"
            onClick={() => navigate("/kiosk/home")}
            className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 text-senior-sm font-semibold text-civic-navy"
          >
            <RefreshCcw className="h-5 w-5" />
            Start Over
          </button>
        </div>
        <div className="mt-6">
          <NavBar mode="kiosk" />
        </div>
        <div className="mt-6 flex-1">
          <Outlet />
        </div>
      </div>
      {showWarning && (
        <Modal
          title="Session ending soon"
          description="For privacy, this kiosk will clear after 30 seconds of inactivity. Tap to continue."
          confirmLabel="Continue Session"
          onConfirm={resetSession}
        />
      )}
    </div>
  );
};

export default KioskShell;
