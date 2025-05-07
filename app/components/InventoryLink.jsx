import Link from "next/link";

export default function InventoryLink({ linkTxt,
  linkUrl,
  className,
  icon,
  isCollapsed }) {
  return (
    <Link

      href={linkUrl}

      className={`${className} `}>

      <div className={`flex 
        ${isCollapsed ? 'flex-col  text-sm ' : ''}`}>
        {icon}
        {linkTxt}
      </div>

    </Link>
  );
}