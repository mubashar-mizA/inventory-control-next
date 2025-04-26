import React from "react";
import { Menu } from "lucide-react";

const DashboardTopNav = ({ toggleSidebar }) => {
  return (
    <div
      className="flex items-center justify-between border-b py-5 fixed top-0 w-full z-50 px-6 bg-white">
      {/* Menu button - visible only on small screens */}

      <div className="text-lg font-bold">Inventory Control System</div>
    </div>
  );
};

export default DashboardTopNav;
