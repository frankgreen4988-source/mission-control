import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Centralized control for Sam & Jimmy's operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <div className="flex h-screen bg-slate-900 text-white">
            <Navigation />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
