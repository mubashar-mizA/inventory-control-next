"use client";

import React, { useState } from "react";

import {
  ChevronLeft,
  User,
  Gauge,
  BarChart,
  File,
  LogOut,
  CreditCard,
  PlusCircle,
  Edit,
  List, Menu, X
} from "lucide-react";

import { signOut } from "next-auth/react";

import InventoryBtn from "./InventoryBtn";

import InventoryLink from "./InventoryLink";

import MyAccordion from "./MyAccordian";

const DashboardSideNav = ({ className, toggleSidebar, isCollapsed }) => {

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [isSigningOut, setIsSigningOut] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
        aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${className} h-screen bg-gray-100  border-r shadow-sm transition-all duration-300
          fixed ease-in-out top-0 left-0 z-40 p-5 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 ${isCollapsed ? "w-28" : "w-56"} flex flex-col`}
      >
        {/* Sidebar Toggle Button */}
        <div className="hidden sm:block absolute bottom-10 -right-[17px] w-max">
          <InventoryBtn
            className="border p-2 rounded-full bg-gray-500 text-white"
            onBtnClick={toggleSidebar}
            btnTxt={
              <ChevronLeft
                className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
                  }`}
                size={18}
              />
            }
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </div>

        {/* Navigation */}
        <nav
          className={`${isCollapsed ? "flex" : ""
            } flex flex-col flex-1 gap-3 text-black`}
        >

          {!isCollapsed}
          <h2 className={`${isCollapsed ? 'text-[10px] text-gray-400  font-bold' : 'text-lg text-gray-400 font-bold'}`}>Overview</h2>

          <div className="">
            <InventoryLink
              linkTxt="Dashboard"
              linkUrl="/pages/dashboard"
              icon={<Gauge size={20} />}
              isCollapsed={isCollapsed}
              isMobileOpen={isMobileOpen}
            />
          </div>

          <div className="">
            <InventoryLink
              linkTxt="Analytics"
              linkUrl="/pages/dashboard/analytics"
              icon={<BarChart size={20} />}
              isCollapsed={isCollapsed}
              isMobileOpen={isMobileOpen}
            />
          </div>

          <h2 className={`${isCollapsed ? 'text-[10px] text-gray-400  font-bold' : 'text-lg text-gray-400 font-bold'}`}>Management</h2>

          <div className="">
            <InventoryLink
              linkTxt="File"
              linkUrl="/pages/dashboard/file"
              icon={<File size={20} />}
              isCollapsed={isCollapsed}
              isMobileOpen={isMobileOpen}
            />
          </div>

          {/* User accordian */}

          <div className="this-is-user-accordian-inside-sidebar-component">
            <MyAccordion
              mainTitle="User"
              icon={<User size={20} />}
              isCollapsed={isCollapsed}
              isMobileOpen={isMobileOpen}
              items={[
                {
                  name: "Profile",
                  link: "/pages/dashboard/users/profile",
                  icon: <User size={16} />,
                },
                {
                  name: "Cards",
                  link: "/pages/dashboard/users/cards",
                  icon: <CreditCard size={16} />,
                },
                {
                  name: "Create",
                  link: "/pages/dashboard/users/create",
                  icon: <PlusCircle size={16} />,
                },
                {
                  name: "Edit",
                  link: "/pages/dashboard/users/edit",
                  icon: <Edit size={16} />,
                },
              ]}
            />
          </div>

          {/* Invoices accordian */}

          <div className="">
            <MyAccordion
              mainTitle="Invoice"
              icon={<File size={20} />}
              isCollapsed={isCollapsed}
              isMobileOpen={isMobileOpen}
              items={[
                {
                  name: "List",
                  link: "/pages/dashboard/invoices/list",
                  icon: <List size={16} />,
                },
                {
                  name: "Details",
                  link: "/pages/dashboard/invoices/detail",
                  icon: <File size={16} />,
                },
                {
                  name: "Create",
                  link: "/pages/dashboard/invoices/create",
                  icon: <PlusCircle size={16} />,
                },
                {
                  name: "Edit",
                  link: "/pages/dashboard/invoices/edit",
                  icon: <Edit size={16} />,
                },
              ]}
            />
          </div>

          {/* Sign Out btn*/}
          <div className="">
            <button
              onClick={() => {
                setIsSigningOut(true);
                setTimeout(() => {
                  signOut({ callbackUrl: "/pages/login" });
                }, 4000);
              }}
              className="flex items-center gap-3 text-red-700 hover:text-red-800"
              disabled={isSigningOut}
            >
              <LogOut size={22} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>

        </nav>

      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      {isSigningOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="text-xl font-semibold text-gray-800 animate-pulse flex flex-col gap-4 items-center">
            <p>Please wait while we log you out</p>
            <p>
              Logging you out...
            </p>
          </div>
        </div>
      )}

    </>
  );
};

export default DashboardSideNav;
