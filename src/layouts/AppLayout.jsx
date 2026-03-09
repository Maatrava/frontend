import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import SideBar from "../components/SideBar";

export default function AppLayout() {
  return (
    <div className="h-screen bg-white flex overflow-hidden">

      {/* Sidebar — desktop only */}
      <div className="hidden md:flex flex-shrink-0">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-screen min-w-0 bg-gray-50">

        {/* TopBar — mobile only */}
        <div className="md:hidden flex-shrink-0">
          <TopBar
            title="Welcome back"
            subtitle="Care for you and your baby today"
          />
        </div>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-6">
          <Outlet />
        </main>

        {/* BottomNav — mobile only */}
        <div className="md:hidden flex-shrink-0">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}