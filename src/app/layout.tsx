import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { headers } from "next/headers";
import { assertLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import { SanityLive } from "../../sanity/lib/live";
import { isSanityPreviewRequest } from "../../sanity/lib/preview";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lifestyle Images",
    template: "%s | Lifestyle Images",
  },
  description:
    "Estetyczne grafiki lifestyle, packshoty, infografiki produktowe i A+ Content dla e-commerce i Amazon.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = assertLocale(requestHeaders.get("x-locale") || undefined);
  const isPreview = await isSanityPreviewRequest();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        {isPreview && <VisualEditing zIndex={1000} />}
        <SanityLive />
      </body>
    </html>
  );
}
