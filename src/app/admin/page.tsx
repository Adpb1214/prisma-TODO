"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "admin") {
    alert("you are not an admin")
    router.push("/"); // Redirect non-admins to home
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
    </div>
  );
}
