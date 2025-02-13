"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Hero Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-3xl text-center border border-gray-600">
        <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-gray-300 mt-2">
          {session
            ? `Hello, ${session.user?.email || "User"}!`
            : "Sign in to access your account."}
        </p>

        {/* Authentication Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {!session ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Role-Based UI */}
      {session && (
        <div className="mt-6 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-center">
            {session.user.role === "admin" ? "Admin Panel" : "User Dashboard"}
          </h2>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-md rounded-xl p-6 border border-gray-600 mt-4">
            {session.user.role === "admin" ? (
              <div className="text-center">
                <p className="text-gray-300">Manage users and settings.</p>
                <button
                  onClick={() => router.push("/admin")}
                  className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Go to Admin Panel
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-300">View and manage your tasks.</p>
                <button
                  onClick={() => router.push("/todos")}
                  className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                >
                  View Tasks
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
