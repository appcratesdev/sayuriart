import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode, headers } from "next/headers";
import { assertLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import { SanityLive } from "../../sanity/lib/live";
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
  const { isEnabled } = await draftMode();
  const requestHeaders = await headers();
  const locale = assertLocale(requestHeaders.get("x-locale") || undefined);
  const referer = requestHeaders.get("referer") || "";
  const isPresentationFrame = referer.includes(".sanity.studio");

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        {(isEnabled || isPresentationFrame) && <VisualEditing zIndex={1000} />}
        <SanityLive />
      </body>
    </html>
  );
}
