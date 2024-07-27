import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/layout/OwnerSidebar";
import RootNavbar from "../components/layout/RootNavbar";

const OwnerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col h-screen">
      <RootNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden ">
        <OwnerSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto  p-4 transition-all duration-300 ease-in-out ${
            isOpen ? "ml-64" : "ml-0"
          } mt-16`}
        >
          <div className={`container mx-auto ${isOpen ? "lg:ml-0" : ""}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
