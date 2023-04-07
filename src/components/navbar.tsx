import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="w-full ">
      <div className="px-3 py-5 max-w-7xl max-h-24 flex justify-between mx-auto">
        <Link href="/" className="flex items-center gap-x-3">
          <div className="w-[40px] h-[40px] rounded-full bg-primary"></div>
          <h1 className="font-bold text-center text-xl">Logo</h1>
        </Link>
        <div className="flex gap-x-3">
          <Image src={"/search.svg"} alt="search" height={24} width={24} />
          <Link href={"/cart"} className="my-auto">
            <Image
              src={"/keranjang.svg"}
              alt="keranjang"
              height={24}
              width={24}
            />
          </Link>
          <Link href={"/login"} className="my-auto">
            <Image src={"/profile.svg"} alt="profile" height={24} width={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
