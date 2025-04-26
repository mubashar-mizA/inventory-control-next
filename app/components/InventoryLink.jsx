import Link from "next/link";

export default function InventoryLink({ linkTxt,
  linkUrl,
  className,
  icon,
  isCollapsed }) {
  return (
    <Link

      href={linkUrl}

      className={`text-lg  

      ${className}`}>

      <div className={` flex gap-2 ${isCollapsed ? 'flex-col text-sm items-center juc' : ''}`}>
        {icon}
        {linkTxt}
      </div>

    </Link>
  );
}