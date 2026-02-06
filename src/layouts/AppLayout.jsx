import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white pb-24">
      <TopBar
        title="Welcome back 💗"
        subtitle="Care for you and your baby today"
      />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
