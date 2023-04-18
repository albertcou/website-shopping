import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { Session } from "next-auth";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
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

        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.email,
            },
          });
        }

        if (!user || !user?.password) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
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
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        const { username, isAdmin }: any = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        token.username = username;
        token.isAdmin = isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...token,
        email: token.email as string,
        username: token.username as string,
        isAdmin: token.isAdmin as boolean,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
