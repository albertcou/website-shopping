// next-auth.d.ts

import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string;
      email?: string;
      image?: string;
      isAdmin?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      username?: string;
      email?: string;
      image?: string;
      isAdmin?: boolean;
    };
  }
}

export default NextAuth;
