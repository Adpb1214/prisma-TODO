import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all users and their todos
export async function GET() {
  const session = await getServerSession(authOptions);

  // Only allow admins to fetch all users
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        todos: true, // Include todos for each user
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}