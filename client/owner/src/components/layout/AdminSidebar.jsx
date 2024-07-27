import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  LogOut,
  Home,
  Users,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: Home },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/owners", label: "Owners", icon: Building },
    { to: "/admin/turfs", label: "Turfs", icon: MapPin },
    { to: "/admin/transactions", label: "Transactions", icon: DollarSign },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 w-64 bg-base-200 overflow-y-auto ease-in-out transition-all duration-300 z-30`}
    >
      <div className="flex items-center justify-between p-4 border-b mt-20">
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

export default AdminSidebar;
