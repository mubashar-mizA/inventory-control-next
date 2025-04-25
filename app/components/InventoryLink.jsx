import Link from "next/link";

export default function InventoryLink({ linkTxt, linkUrl, className }) {
  return (
    <Link
      href={linkUrl}
      className={`text-sm font-bold text-gray-400  ${className}`}>
      {linkTxt}

    </Link>
  );
}