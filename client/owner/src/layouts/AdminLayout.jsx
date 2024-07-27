import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";
import RootNavbar from "../components/layout/RootNavbar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <RootNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <AdminSidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          className={`
            fixed lg:static 
            w-64 
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            z-30 lg:z-0
            h-screen
          `}
        />
        <main
          className={`
          flex-1 
          overflow-x-hidden 
          overflow-y-auto 
          p-4 
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? "lg:ml-64" : "ml-0"}
        `}
        >
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
