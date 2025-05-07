import React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@heroui/react";

const DashboardTopNav = ({ toggleSidebar, className }) => {
  const { data } = useSession();
  console.log('Data ====>*', data)
  let userName = (data?.user?.name)
  userName = userName?.toLocaleUpperCase()

  return <section
    className={`this-is-in-top-nav-bar-component p-5 border-b shadow-sm
      ${className} 
      flex justify-between items-center`}
  >
    <h2 className="text-gray-500 font-bold">Inventory Control System </h2>
    <Avatar
      name="Joe"
      size="md"
      className="border border-blue-800 hidden sm:flex sm:items-center sm:justify-center"
    />
  </section>

};

export default DashboardTopNav;
