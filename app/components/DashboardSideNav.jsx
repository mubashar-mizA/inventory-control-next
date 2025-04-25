import React from "react";
import InventoryLink from "./InventoryLink";
import InventoryBtn from "./InventoryBtn";

const DashboardSideNav = ({ className }) => {
  const handleLogout = () => {
    console.log("Logout button clicked");
  };

  return (
    <div className={`${className}`}>

      <h2 className="w-14 h-14 bg-gray-400 rounded-full"></h2>

      <nav className="flex flex-col items-start gap-1 mt-4">
        <InventoryLink
          linkTxt="Profile"
          linkUrl="/pages/dashboard/profile"
          className=" rounded-md"
        />
        <InventoryLink
          linkTxt="Dashboard"
          linkUrl="/pages/dashboard"
          className=" rounded-md"
        />
        <InventoryBtn
          className="rounded-md"
          BtnTxt="Logout"
          onBtnPress={handleLogout}
        />
      </nav>

    </div>
  );
};

export default DashboardSideNav;