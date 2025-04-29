"use client"
import InventoryLink from "./components/InventoryLink";
export default function Home() {

  return (

    <div>
      <h1>Landing page</h1>
      <InventoryLink linkTxt={'Get started'} linkUrl={'/pages/login'} />
    </div>
  );

}
