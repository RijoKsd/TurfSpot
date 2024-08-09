import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Home,
  Users,
  Building,
  MapPin,
  DollarSign,
  UserPlus,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar, className }) => {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: Home },
    { to: "/admin/owner-requests", label: "Owner Requests", icon: UserPlus },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/owners", label: "Owners", icon: Building },
    { to: "/admin/turfs", label: "Turfs", icon: MapPin },
    { to: "/admin/transactions", label: "Transactions", icon: DollarSign },
  ];

  return (
    <aside className={`${className} bg-base-200 overflow-y-auto`}>
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-semibold">Admin Dashboard</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-1">
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

export default AdminSidebar;
