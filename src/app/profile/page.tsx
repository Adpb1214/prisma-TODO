"use client";

import { signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-lg font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[350px] text-center border border-gray-600">
       

        {/* User Details */}
        <h1 className="mt-4 text-2xl font-semibold">{session.user.name || "User"}</h1>
        <p className="text-gray-300 mt-1">{session.user.email}</p>
        <span className="text-sm px-4 py-1 mt-2 inline-block bg-gray-700 rounded-full">
          Role: {session.user.role || "User"}
        </span>

        {/* Logout Button */}
        <button
          onClick={() => signOut()}
          className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 transition rounded-full text-white font-medium shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
