"use client";

import DashboardSideNav from "@/app/components/DashboardSideNav";
import DashboardTopNav from "@/app/components/DashboardTopNav";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-max border-r shadow-md transform bg-white text-black ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out  md:static md:shadow-none`}
      >
        <DashboardSideNav className="flex flex-col h-full p-4" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-20 shadow-md md:static md:shadow-none bg-white text-black">
          <DashboardTopNav toggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 mt-16 md:mt-0 bg-white text-black">
          {children}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;