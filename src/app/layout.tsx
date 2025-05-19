import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "../trpc/server";
import ClientLayout from "./ClientLayout";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "GHOPay",
  description:
    "GhoPay is your go-to app for adding and sending funds across the **Lens Protocol** social graph. Built for social-native DeFi",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} `}>
      <body>
        <ToastContainer position="bottom-right" />
        <TRPCReactProvider>
          <HydrateClient>
            <main className="mx-auto h-full max-w-full md:h-screen md:max-w-xl">
              <ClientLayout> {children}</ClientLayout>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
