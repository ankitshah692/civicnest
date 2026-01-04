import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar.jsx";

const AppShell = () => {
  return (
    <div className="relative min-h-screen px-6 py-8">
      <div className="decorative-bg absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-r from-cyan-100 via-blue-100 to-slate-100 opacity-70" />
      <NavBar mode="app" />
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
