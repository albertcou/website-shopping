"use client";

import { useSession } from "next-auth/react";

function Page() {
  const session = useSession();
  return <pre>{JSON.stringify(session)}</pre>;
}

export default Page;
