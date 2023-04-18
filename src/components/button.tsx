'use client'
import React from "react";
import { clsx } from "clsx";
import { toast } from "react-hot-toast";

function Button({
  text,
  primary = false,
  danger = false,
  className,
  onClick,
  type = "button",
  disable = false,
}: {
  text: string;
  primary?: boolean;
  danger?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}) {
  return (
    <button
      className={clsx(
        "text-center text-lg font-semibold w-36 py-2 rounded-full shadow-md",
        primary
          ? "bg-primary text-white"
          : danger
          ? "border border-danger text-danger"
          : "border border-primary text-primary",
        disable && "bg-slate-400",
        className && `${className}`
      )}
      onClick={onClick}
      type={type}
      disabled={disable}
    >
      {text}
    </button>
  );
}

function Jumlah({
  value = 1,
  setTotalCart,
}: {
  value?: number;
  setTotalCart: React.Dispatch<React.SetStateAction<number>>;
}) {
  const onClickHandler = (type: string) => {
    switch (type) {
      case "add":
        value > 0 && setTotalCart(value + 1);
        toast.success(`🛒 Berhasil Menambah 1 Item 😄`);
        break;
      case "remove":
        if (value > 1) {
          setTotalCart(value - 1);
          toast.error(`🛒 Berhasil Mengurangi 1 Item 😒`);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex justify-between py-2 text-2xl font-bold border rounded-full shadow-md w-36 border-slate-200">
      <button className="mx-3" onClick={() => onClickHandler("remove")}>
        -
      </button>
      <div>{value}</div>
      <button className="mx-3" onClick={() => onClickHandler("add")}>
        +
      </button>
    </div>
  );
}

Button.Jumlah = Jumlah;

export default Button;
