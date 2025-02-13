import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// Update user role
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Only allow admins to update roles
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { role },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Failed to update user role:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}