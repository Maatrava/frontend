import React, { useState } from "react";
import { Menu, Bell, User} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-gray-900 shadow-md fixed w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Center section - Home text */}
          <div className="flex-1 flex justify-center sm:justify-start sm:ml-8">
            <span className="text-xl font-medium">Home</span>
          </div>

          {/* Right section - Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - expandable */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Menu Item 1
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Menu Item 2
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Menu Item 3
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
