"use client";

import InventoryBreadcrumbs from "@/app/components/Breadcrumbs";
import DashboardSideNav from "@/app/components/DashboardSideNav";
import DashboardTopNav from "@/app/components/DashboardTopNav";

import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          isCollapsed ? "md:ml-28" : "md:ml-56"
        } w-full`}
      >
        {/* Top Navigation */}
        <div className="sticky top-0 z-20">
          <DashboardTopNav />
        </div>

        {/* Main area with breadcrumbs */}
        <main className="p-4 md:mt-20">
          <InventoryBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
