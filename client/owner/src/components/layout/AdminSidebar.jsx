import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Home,
  Users,
  Building,
  MapPin,
  DollarSign,
  UserPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar, className }) => {
  const location = useLocation();
  const [ownerRequestsOpen, setOwnerRequestsOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: Home },
    {
      label: "Owner Requests",
      icon: UserPlus,
      subItems: [
        { to: "/admin/owner-requests/new", label: "New Requests" },
        { to: "/admin/owner-requests/rejected", label: "Rejected Requests" },
      ],
    },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/owners", label: "Owners", icon: Building },
    { to: "/admin/turfs", label: "Turfs", icon: MapPin },
    { to: "/admin/transactions", label: "Transactions", icon: DollarSign },
  ];

  const toggleOwnerRequests = () => {
    setOwnerRequestsOpen(!ownerRequestsOpen);
  };

  const renderNavItem = (item) => {
    if (item.subItems) {
      return (
        <div key={item.label}>
          <button
            onClick={toggleOwnerRequests}
            className={`flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-base-300`}
          >
            <div className="flex items-center">
              <item.icon size={18} className="mr-2" />
              {item.label}
            </div>
            {ownerRequestsOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {ownerRequestsOpen && (
            <div className="ml-4">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.to}
                  to={subItem.to}
                  className={`flex items-center px-4 py-2 text-sm ${
                    location.pathname === subItem.to
                      ? "bg-accent text-accent-content"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center px-4 py-2 text-sm ${
          location.pathname === item.to
            ? "bg-accent text-accent-content"
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
    );
  };

  return (
    <aside
      className={`${className} bg-base-200 overflow-y-auto fixed lg:static
          w-64 transition-transform duration-300 ease-in-out z-30 lg:z-0
          min-h-screen`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-semibold">Admin Dashboard</span>
        <button onClick={toggleSidebar} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-1">{navItems.map(renderNavItem)}</nav>
    </aside>
  );
};

export default AdminSidebar;
