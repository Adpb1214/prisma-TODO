// app/api/users/[userId]/route.ts
// api/users/[userId]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;  // This gets the userId from the URL

  // Get session
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    // Fetch tasks (todos) associated with the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },  // This includes the tasks (todos) of the user
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.todos);  // Return only the todos (tasks) of the user
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user tasks" }, { status: 500 });
  }
}

