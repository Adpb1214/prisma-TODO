"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (status === "loading")
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  if (!session || session.user.role !== "admin") {
    alert("You are not authorized to view this page.");
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Dashboard Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-3xl border border-gray-600 text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-300 mt-2">Welcome, {session.user.email}!</p>
      </div>

      {/* Users List */}
      <div className="mt-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-md rounded-xl p-6 border border-gray-600">
          {users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 flex justify-between items-center"
                >
                  <div>
                    <strong className="text-lg">{user.name}</strong>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                  <Link
                    href={`/admin/${user.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
