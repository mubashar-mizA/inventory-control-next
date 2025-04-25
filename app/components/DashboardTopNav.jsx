import React from "react";
import { Menu } from "lucide-react";

const DashboardTopNav = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between border-b bg-gray-800 text-white py-4 fixed top-0 w-full z-50 px-6">
      {/* Menu button - visible only on small screens */}

      <div className="text-lg font-bold">Inventory Control System</div>
    </div>
  );
};

export default DashboardTopNav;
