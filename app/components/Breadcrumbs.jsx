"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function InventoryBreadcrumbs() {
    const pathname = usePathname();

    // Get all segments, filter out 'pages'
    const segments = pathname
        .split("/")
        .filter((segment) => segment && segment !== "pages");

    // Optional: Mapping for cleaner labels
    const labelMap = {
        dashboard: "Dashboard",
        inventory: "Inventory",
        list: "Item List",
        add: "Add Item",
        edit: "Edit Item",
    };

    return (
        <div className="mb-4">
            <Breadcrumbs>
                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");

                    // Use mapping if available, otherwise capitalize first letter
                    const label =
                        labelMap[segment] ||
                        segment.charAt(0).toUpperCase() + segment.slice(1);

                    return (
                        <BreadcrumbItem key={href}>
                            {label}
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
}
