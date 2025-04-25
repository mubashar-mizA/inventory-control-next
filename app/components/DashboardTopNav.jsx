import React from "react";
import { Menu } from "lucide-react";

const DashboardTopNav = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Menu button - visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-black"
      >
        <Menu size={28} />
      </button>

      <div className="text-lg font-bold">Inventory Control System</div>
    </div>
  );
};

export default DashboardTopNav;
