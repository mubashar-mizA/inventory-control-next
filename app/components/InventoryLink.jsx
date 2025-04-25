import Link from "next/link";

export default function InventoryLink({ linkTxt, linkUrl, className }) {
  return (
    <Link href={linkUrl} className={`text-sm font-medium ${className}`}>
      {linkTxt}
    </Link>
  );
}