import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, MapPin, Star, Calendar, PlusCircle } from "lucide-react";

const OwnerSidebar = ({ isOpen, toggleSidebar, className }) => {
  const location = useLocation();

  const navItems = [
    { to: "/owner", label: "Dashboard", icon: Home },
    { to: "/owner/turfs", label: "My Turfs", icon: MapPin },
    { to: "/owner/add-turf", label: "Add Turf", icon: PlusCircle },
    { to: "/owner/reviews", label: "Reviews", icon: Star },
    { to: "/owner/bookings", label: "Bookings", icon: Calendar },
  ];

  return (
    <aside
      className={`${className} bg-base-200 overflow-y-auto  fixed lg:static 
    w-64 transition-transform duration-300 ease-in-out z-30 lg:z-0 min-h-screen`}
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
            onClick={() => {
              if (window.innerWidth < 1024) {
                toggleSidebar();
              }
            }}
          >
            <item.icon size={18} className="mr-2" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default OwnerSidebar;
