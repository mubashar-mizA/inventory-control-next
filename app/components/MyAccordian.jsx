"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function MyAccordion({
  mainTitle,
  items = [],
  isCollapsed,
  icon,
  isMobileOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="this-is-main-div-of-accordian-component flex flex-col gap-2">

      <button
        onClick={toggleAccordion}
        className={`flex this-is-button-very-next-to-div
          ${isCollapsed && !isMobileOpen ? " when-navbar-collapsed" : " when-navbar-not-collapsed"
          }`}
        aria-expanded={isOpen}
        aria-label={`Toggle ${mainTitle} accordion`}
      >

        <div
          className={`flex  this-is-very-next-div-inside--main-div-of-accordian-component ${isCollapsed && !isMobileOpen
            ? "flex-col text-sm "
            : ""
            }`}
        >
          {icon}
          <span className="flex-1">{mainTitle}</span>
        </div>

        {/* Show chevron only when not collapsed or in mobile open mode */}

        {(!isCollapsed || isMobileOpen) && (
          <>{isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}</>
        )}

      </button>


      {(!isCollapsed || isMobileOpen) && isOpen && (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.link || "#"}
              className="flex text-sm"
            >
              <div
                className={`flex gap-2 ml-4 ${isCollapsed ? "flex-col text-sm" : ""
                  }`}
              >
                {item.icon}
                <span className="text-gray-900">{item.name}</span>
              </div>
            </a>
          ))}
        </div>
      )}

    </div>
  );
}