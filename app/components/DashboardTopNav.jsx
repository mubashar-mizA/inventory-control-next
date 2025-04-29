import React from "react";
import { useSession } from "next-auth/react";

const DashboardTopNav = ({ toggleSidebar }) => {
  const { data } = useSession();
  let userName = (data?.user?.name)
  userName = userName?.toLocaleUpperCase()

  return (
    <div className="fixed top-0 z-50 w-full border-b bg-white py-5">

      <div className="mx-auto flex  flex-col px-4 sm:px-6">

        <h1 className="text-lg font-bold ">Inventory Control System</h1>

        <h2 className="text-sm text-gray-700 ">
          Welcome back {userName || "Loading..."}
        </h2>

      </div>
    </div>
  );
};

export default DashboardTopNav;
