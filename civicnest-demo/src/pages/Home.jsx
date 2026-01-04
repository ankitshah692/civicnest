import { ClipboardList, FileText, Users, CalendarDays } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BigButton from "../components/common/BigButton.jsx";
import AudioPlayer from "../components/common/AudioPlayer.jsx";
import MemoryRecaps from "../components/app/MemoryRecaps.jsx";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isKiosk = location.pathname.startsWith("/kiosk");
  const basePath = isKiosk ? "/kiosk" : "/app";

  return (
    <div className="space-y-8">
      {!isKiosk && <MemoryRecaps />}

      <section className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Welcome to CivicNest!</h1>
        <p className="mt-2 text-senior-base text-slate-600">Select an option to begin.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <BigButton
            icon={<Users />}
            label="Get Involved"
            onClick={() => navigate(`${basePath}/get-involved`)}
            audioLabel="Go to Get Involved"
          />
          <BigButton
            icon={<FileText />}
            label="News"
            onClick={() => navigate(`${basePath}/news`)}
            audioLabel="Go to News"
            variant="secondary"
          />
          <BigButton
            icon={<ClipboardList />}
            label="Surveys"
            onClick={() => navigate(`${basePath}/surveys`)}
            audioLabel="Go to Surveys"
            variant="outline"
          />
          <BigButton
            icon={<CalendarDays />}
            label="Events"
            onClick={() => navigate(`${basePath}/events`)}
            audioLabel="Go to Events"
          />
        </div>

        <div className="mt-6">
          <AudioPlayer
            text="Welcome to CivicNest. Choose Get Involved, News, Surveys, or Events to continue."
            label="Listen to instructions"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
