"use client";

import React, { useState } from "react";
import { ChevronLeft, User, Gauge, BarChart, File, LogOut } from "lucide-react";

const InventoryLink = ({ linkTxt, linkUrl, className, icon, isCollapsed, isMobileOpen }) => (
  <a
    href={linkUrl}
    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors ${className}`}
    aria-label={linkTxt}
  >
    {icon}
    {(!isCollapsed || isMobileOpen) && <span className="text-gray-200">{linkTxt}</span>}
  </a>
);

const InventoryBtn = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors ${className}`}
  >
    {children}
  </button>
);

const MyAccordian = ({ mainTitle, items, isCollapsed, icon, isMobileOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700 transition-colors"
        aria-expanded={isOpen}
        aria-label={`Toggle ${mainTitle} accordion`}
      >
        {icon}
        {(!isCollapsed || isMobileOpen) && <span className="text-gray-200">{mainTitle}</span>}
      </button>
      {(!isCollapsed || isMobileOpen) && isOpen && (
        <div className="pl-8 py-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-2 text-gray-300 hover:bg-gray-600 rounded-md text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardSideNav = ({ className, toggleSidebar, isCollapsed }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logout button clicked");
  };

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
        <ChevronLeft
          className={`transition-transform ${isMobileOpen ? "rotate-180" : ""}`}
          size={24}
        />
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${className}
          bg-gray-800 text-white
          h-screen
          transition-all duration-300
          fixed top-0 left-0
          z-40 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${isCollapsed ? "w-16" : "w-44"}
          flex flex-col
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {(!isCollapsed || isMobileOpen) && (
            <h2 className="text-gray-300 font-bold text-lg">Overview</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none hidden md:block"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`text-gray-300 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
                }`}
              size={24}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-1 gap-0 sm:gap-1 px-0 sm:px-3 mt-4">
          <InventoryLink
            linkTxt="Profile"
            linkUrl="/pages/dashboard/profile"
            className="text-gray-200"
            icon={<User size={20} className="text-gray-200 " />}
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
          />
          <InventoryLink
            linkTxt="Dashboard"
            linkUrl="/pages/dashboard"
            className="text-gray-200"
            icon={<Gauge size={20} className="text-gray-200" />}
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
          />
          <InventoryLink
            linkTxt="Analytics"
            linkUrl="/pages/dashboard"
            className="text-gray-200"
            icon={<BarChart size={20} className="text-gray-200" />}
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
          />
          <InventoryLink
            linkTxt="File"
            linkUrl="/pages/dashboard"
            className="text-gray-200"
            icon={<File size={20} className="text-gray-200" />}
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
          />

          <MyAccordian
            mainTitle="User"
            items={["Profile", "Cards", "Create", "Edit"]}
            isCollapsed={isCollapsed}
            icon={<User size={20} className="text-gray-200" />}
            isMobileOpen={isMobileOpen}
          />
          <MyAccordian
            mainTitle="Invoice"
            items={["Profile", "Cards", "Create", "Edit"]}
            isCollapsed={isCollapsed}
            icon={<File size={20} className="text-gray-200" />}
            isMobileOpen={isMobileOpen}
          />
        </nav>

        {/* Logout Button */}
        <div className="p-3">
          <InventoryBtn
            onClick={handleLogout}
            className="w-full text-gray-200"
          >
            <LogOut size={20} className="text-gray-200" />
            {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </InventoryBtn>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
};

export default DashboardSideNav;