"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { trpc } from "trpc/router";
import { httpBatchLink } from "@trpc/client";
import "../styles/globals.css";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <html lang="en">
            <body>
              <>
              <Header/>
              <>
              {children}
              </>
              
              <Footer/>
              </>
              
              </body>
          </html>
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  );
}