// app/api/todos/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "server/db";
// import { prisma } from "@/lib/prisma";

// ✅ PATCH - Toggle Completed OR Edit Title
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { completed, title } = await req.json();

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(completed !== undefined ? { completed } : {}), // Ensure `completed` updates correctly
        ...(title !== undefined ? { title } : {}), // Ensure `title` updates correctly
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
  }
}

// ✅ DELETE - Remove a Todo
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      await prisma.todo.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
  }
  


