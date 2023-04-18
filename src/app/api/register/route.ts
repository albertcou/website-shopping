import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  let existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  if (existingUser) {
    // User already exists, return an error
    return new Response("User Already Exists!", { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
