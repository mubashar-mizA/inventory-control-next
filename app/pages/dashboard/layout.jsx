"use client";

import DashboardSideNav from "@/app/components/DashboardSideNav";
import DashboardTopNav from "@/app/components/DashboardTopNav";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar collapsed by default on desktop

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSideNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "md:ml-16" : "md:ml-44"
        } w-full`}
      >
        {/* Top Navigation */}
        <div className="sticky top-0 z-20">
          <DashboardTopNav />
        </div>
        {/* Child Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;