"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="w-full ">
      <div className="flex justify-between px-3 py-5 mx-auto max-w-7xl max-h-24">
        <Link href="/" className="flex items-center gap-x-3">
          <div className="w-[40px] h-[40px] rounded-full bg-primary"></div>
          <h1 className="text-xl font-bold text-center">Logo</h1>
        </Link>
        <div className="flex gap-x-3">
          <Image src={"/search.svg"} alt="search" height={24} width={24} />
          <Link href={"/cart"} className="p-0 my-auto btn btn-link">
            <Image
              src={"/keranjang.svg"}
              alt="keranjang"
              height={24}
              width={24}
            />
          </Link>
          {session?.user?.email ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="px-0 no-underline hover:no-underline btn btn-link rounded-btn gap-x-1 text-primary"
              >
                <Image
                  src={"/profile.svg"}
                  alt="profile"
                  height={24}
                  width={24}
                />
                <p className="flex items-center ml-0 ">
                  {session?.user?.username && session.user.username}
                </p>
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-4 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                {session?.user && session.user.isAdmin && (
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                )}
                <li>
                  <Button
                    text="Logout"
                    danger={true}
                    className="w-full"
                    onClick={() => {
                      signOut({
                        redirect: false, // Tidak dilakukan redirect
                      });
                      toast.error("❌ Kamu Telah Logout 😥!");
                      router.refresh();
                    }}
                  />
                </li>
              </ul>
            </div>
          ) : (
            <Link href={"/auth/login"} className="my-auto">
              <Image
                src={"/profile.svg"}
                alt="profile"
                height={24}
                width={24}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
