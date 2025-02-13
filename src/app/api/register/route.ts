// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";
// import { prisma } from "server/db";

// export async function POST(req: Request) {
//   const { name, email, password } = await req.json();

//   if (!name || !email || !password) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     return NextResponse.json({ error: "Email already in use" }, { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await prisma.user.create({
//     data: { name, email, password: hashedPassword },
//   });

//   return NextResponse.json(user, { status: 201 });
// }
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "server/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Force role to always be "user"
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: "user" },
    });

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
