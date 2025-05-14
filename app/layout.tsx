import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";
import LimitedNav from "@/components/common/limitedNav";
import LimitedFooter from "@/components/common/limitedFooter";
import FullNav from "@/components/common/fullNav";
import FullFooter from "@/components/common/fullFooter";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Coffee App",
  description: "Coffee App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
        >
          {userId ? <FullNav /> : <LimitedNav />}
          <main className="flex-1">{children}</main>
          {userId ? <FullFooter /> : <LimitedFooter />}
        </body>
      </html>
    </ClerkProvider>
  );
}
