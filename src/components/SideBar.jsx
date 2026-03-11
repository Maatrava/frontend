import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { House, User, Baby, MessageCircle, LogOut, Heart, Bookmark } from "lucide-react";
import { getUserData, clearAuthToken, clearUserData } from "../auth/token";

const navItems = [
    {
        section: "Navigation",
        items: [
            { label: "Home", icon: House, path: "/home" },
            { label: "Mother Health", icon: Heart, path: "/mother" },
            { label: "Baby Tracker", icon: Baby, path: "/baby" },
            { label: "AI Chat", icon: MessageCircle, path: "/chat" },
            { label: "Saved Articles", icon: Bookmark, path: "/saved-articles" },
        ],
    },
    {
        section: "Account",
        items: [
            { label: "Profile", icon: User, path: "/profile" },
            { label: "Logout", icon: LogOut, path: "/logout" },
        ],
    },
];

export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = getUserData();
        if (data) setUser(data);
    }, []);

    const handleNavigate = (path, label) => {
        if (label === "Logout") {
            clearAuthToken();
            clearUserData();
            navigate("/login");
            return;
        }
        navigate(path);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`relative flex h-screen ${collapsed ? "w-25" : "w-70"}  flex-col bg-[#FFF1F5] transition-all duration-300 ease-in-out`}>
            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-rose-300 text-white text-xs shadow-md hover:bg-rose-400 transition-colors"
            >
                {collapsed ? "›" : "‹"}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-6 border-b border-rose-100">
                <img src="/maatrava_logo.png" alt="Logo" className="h-15 w-15 rounded-full" />
            </div>

            {/* Nav Sections */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-1">
                {navItems.map(({ section, items }) => (
                    <div key={section} className="px-3 pt-3">
                        {!collapsed && (
                            <p className="mb-1 px-2 text-xl font-bold uppercase tracking-widest text-rose-300">
                                {section}
                            </p>
                        )}
                        {items.map(({ label, icon, path }) => {
                            const Icon = icon;
                            const active = isActive(path);

                            return (
                                <button
                                    key={label}
                                    onClick={() => handleNavigate(path, label)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-lg font-medium transition-all duration-150
            ${active
                                            ? "bg-rose-500 text-white shadow-sm shadow-rose-200"
                                            : "text-rose-700 hover:bg-rose-100 hover:text-rose-900"
                                        }`}
                                    title={collapsed ? label : ""}
                                >
                                    <span className="text-base flex-shrink-0">
                                        <Icon size={25} />
                                    </span>

                                    {!collapsed && (
                                        <span className="whitespace-nowrap">{label}</span>
                                    )}

                                    {isActive && !collapsed && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white opacity-80" />
                                    )}
                                </button>
                            );
                        })}

                    </div>
                ))}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="border-t border-rose-100 px-4 py-4">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-rose-200 flex items-center justify-center text-sm font-bold text-rose-700 shadow-inner">
                            {user?.name ? user.name[0].toUpperCase() : "👤"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-rose-800 truncate">{user?.name || "Guest User"}</p>
                            <p className="text-[10px] text-rose-400 truncate">{user?.email || "No email"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}