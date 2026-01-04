import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import ReportIssue from "./pages/ReportIssue.jsx";
import Surveys from "./pages/Surveys.jsx";
import Events from "./pages/Events.jsx";
import GetInvolved from "./pages/GetInvolved.jsx";
import Caregiver from "./pages/Caregiver.jsx";
import AppShell from "./components/app/AppShell.jsx";
import KioskShell from "./components/kiosk/KioskShell.jsx";

const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="surveys" element={<Surveys />} />
          <Route path="events" element={<Events />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="caregiver" element={<Caregiver />} />
        </Route>

        <Route path="/kiosk" element={<KioskShell />}>
          <Route index element={<Navigate to="/kiosk/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="surveys" element={<Surveys />} />
          <Route path="events" element={<Events />} />
          <Route path="get-involved" element={<GetInvolved />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
