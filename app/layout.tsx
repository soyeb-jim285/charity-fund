import { Header } from "@/components/header";
import { QueryProviders } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  ClerkProvider
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charity App",
  description: "A simple charity app built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <SheetProvider />
          <QueryProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              // enableSystem={true}
              // storageKey="theme"
            >
              <Header />
              <div vaul-drawer-wrapper="">
                <div className="relative flex min-h-screen flex-col bg-background">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </QueryProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
