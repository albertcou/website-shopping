'use client'
// import { getServerSession } from "next-auth/next";
// import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

function Page() {
  // const session = await getServerSession(GET);
  const { data: session, status } = useSession()
  console.log(session)
  return <pre>{JSON.stringify(session, null, 2)}</pre>
  // return <pre>{JSON.stringify(session, null, 2)}</pre>;
}

// export default Page;
export default Page;