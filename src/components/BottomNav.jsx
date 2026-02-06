import { NavLink } from "react-router-dom";
import { House, User, Baby, MessageCircle } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-100 ">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="grid grid-cols-4 gap-1">
          <NavItem to="/home" icon={House} label="Home" />
          <NavItem to="/mother" icon={User}  label="Mother" />
          <NavItem to="/baby" icon={Baby}  label="Baby" />
          <NavItem to="/chat" icon={MessageCircle} label="AI Chat" />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm transition-all duration-200 ${
          isActive
            ? "text-blue-600 font-semibold scale-105"
            : "text-gray-600 hover:text-blue-600  active:scale-95"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon 
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
              isActive ? "scale-110" : ""
            }`}
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className="leading-none">{label}</span>
        </>
      )}
    </NavLink>
  );
}