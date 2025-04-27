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
    <div>
      <button
        onClick={toggleAccordion}
        className={`flex rounded-lg transition-colors w-full text-lg ${
          isCollapsed && !isMobileOpen ? "justify-center" : "items-center gap-2"
        }`}
        aria-expanded={isOpen}
        aria-label={`Toggle ${mainTitle} accordion`}
      >
        <div
          className={`flex gap-2 ${
            isCollapsed && !isMobileOpen
              ? "flex-col text-sm items-center justify-center"
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
        <div className="pl-8 flex flex-col gap-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.link || "#"}
              className="flex items-center gap-2 p-2 rounded-md text-sm"
            >
              <div
                className={`flex gap-2 ${
                  isCollapsed ? "flex-col text-sm items-center justify-center" : ""
                }`}
              >
                {item.icon}
                <span className="text-black">{item.name}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}