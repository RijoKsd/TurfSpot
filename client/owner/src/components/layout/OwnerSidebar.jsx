import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, LogOut, Home, MapPin, Star, Calendar } from "lucide-react";

const OwnerSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: "/owner", label: "Dashboard", icon: Home },
    { to: "/owner/turfs", label: "My Turfs", icon: MapPin },
    { to: "/owner/reviews", label: "Reviews", icon: Star },
    { to: "/owner/bookings", label: "Bookings", icon: Calendar },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 w-64 bg-base-200 overflow-y-auto ease-in-out transition-all duration-300 z-30`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-semibold">Owner Dashboard</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center px-4 py-2 text-sm ${
              location.pathname === item.to
                ? "bg-primary text-primary-content"
                : "hover:bg-base-300"
            }`}
            onClick={() => toggleSidebar()}
          >
            <item.icon size={18} className="mr-2" />
            {item.label}
          </Link>
        ))}
        <Link
          to="/logout"
          className="flex items-center px-4 py-2 text-sm hover:bg-base-300"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default OwnerSidebar;
