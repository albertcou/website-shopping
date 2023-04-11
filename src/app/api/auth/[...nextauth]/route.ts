import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

const authOptions: AuthOptions = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text", placeholder: "email@email.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !user?.password) {
            throw new Error("Invalid Credentials");
          }
  
          const isCorrectPassword = bcrypt.compare(
            credentials.password,
            user.password
          );
  
          if (!isCorrectPassword) {
            throw new Error("Invalid Credentials");
          }
  
          return user;
        },
      }),
    ],
    pages: {
      signIn: "/login"
    },
    debug: process.env.NODE_ENV !== "development",
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { authOptions as GET, authOptions as POST }

