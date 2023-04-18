"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function Page() {
  const { data: session } = useSession();
  if(!session?.user?.isAdmin ){
    redirect("/")
  }
  return <div>page</div>;
}

export default Page;
