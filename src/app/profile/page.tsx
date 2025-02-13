// "use client";

// import { useSession } from "next-auth/react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p>Loading...</p>;

//   if (!session) return <p>You are not logged in.</p>;

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <p><strong>Email:</strong> {session.user?.email}</p>
//       <p><strong>Role:</strong> {session.user?.role}</p>
//     </div>
//   );
// }
"use client";

import { signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role || "User"}</p>
      
      {/* Logout Button */}
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
