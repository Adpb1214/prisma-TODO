// app/api/users/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // Adjust according to your setup
// import db from "@/lib/db"; // Your Prisma client or database instance
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  const session = await getServerSession(authOptions); // Retrieve the session using NextAuth's method

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany(); // Fetch all users from the database
    return NextResponse.json(users); // Return the user data as JSON
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

