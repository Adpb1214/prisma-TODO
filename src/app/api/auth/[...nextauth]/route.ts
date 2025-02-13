// import NextAuth from "next-auth";

// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }

//         const passwordMatch = await bcrypt.compare(
//           credentials.password.toString(),
//           user.password.toString()
//         );

//         if (!passwordMatch) {
//           throw new Error("Invalid credentials");
//         }

//         return { id: user.id, email: user.email, role: user.role };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role; // Ensure role is stored in token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           role: token.role,
//           email: token.email,
//         };
//       }
//       return session;
//     },
//   },
  
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// const { handlers } = NextAuth(authOptions);
// export const { GET, POST } = handlers;

// reg log in ok====

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }

//         const passwordMatch = await bcrypt.compare(
//           credentials.password.toString(),
//           user.password.toString()
//         );

//         if (!passwordMatch) {
//           throw new Error("Invalid credentials");
//         }

//         return { id: user.id, email: user.email, role: user.role };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           role: token.role,
//           email: token.email,
//         };
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.email = user.email;
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };

// const { handlers } = NextAuth(authOptions);
// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password.toString(),
          user.password.toString()
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          email: token.email,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

// Export both GET and POST to handle both kinds of requests
export { handler as GET, handler as POST };