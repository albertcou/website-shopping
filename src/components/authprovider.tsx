"use client";

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

function AuthProvider({ children }: {children: ReactNode}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default dynamic(() => Promise.resolve(AuthProvider), { ssr: false });