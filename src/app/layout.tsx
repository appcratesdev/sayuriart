import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Lifestyle Images — Realistyczne grafiki produktowe",
  description: "Estetyczne grafiki lifestyle, packshoty, infografiki produktowe i A+ Content dla e-commerce i Amazon.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="pl">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
