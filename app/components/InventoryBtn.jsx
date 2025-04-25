import { Button } from "@heroui/react";

export default function InventoryBtn({
  className,
  btnTxt,
  onBtnClick
}) {
  return <Button
    className={`${className}`}
    onPress={onBtnClick}
  >{btnTxt}</Button>;
}
