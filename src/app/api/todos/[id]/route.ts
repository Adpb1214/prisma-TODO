import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { prisma } from "server/db";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { prisma } from "@/lib/prisma";

// ✅ Toggle Completed & Update Title
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, completed, deadline } = await req.json(); // Add deadline here
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }), // Update title if provided
        ...(completed !== undefined && { completed }), // Toggle completed if provided
        ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }), // Update deadline if provided
      },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// ✅ Delete Todo
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.todo.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
