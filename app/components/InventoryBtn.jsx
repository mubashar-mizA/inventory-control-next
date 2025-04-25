import React from "react";

const InventoryBtn = ({ className, BtnTxt, onBtnPress }) => {
  return (
    <button
      className={`text-sm font-medium ${className}`}
      onClick={onBtnPress}
    >
      {BtnTxt}
    </button>
  );
};

export default InventoryBtn;