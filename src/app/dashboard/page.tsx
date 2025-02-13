// "use client"
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <TodoForm />
      {/* <TodoList /> */}
    </div>
  );
}