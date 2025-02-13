// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function createContext() {
  const session = await getServerSession(authOptions);
  return { session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;