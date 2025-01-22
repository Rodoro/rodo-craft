import type { Metadata } from "next";
import { Rubik, Luckiest_Guy, Inter } from 'next/font/google'
import "./globals.css";
import { Navbar } from "@/containers/layout/Navbar";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: "600",
  variable: '--font-inter',
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: "900",
  variable: '--font-rubik',
});

const guy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-guy',
});

export const metadata: Metadata = {
  title: "RodoCraft",
  description: "The best minecraft game server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.variable + " " + guy.variable + " " + inter.variable}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
