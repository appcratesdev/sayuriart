import { redirect } from "next/navigation";
import { defaultLocale, pathForLocale } from "@/lib/i18n";

export default async function LegacyProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(pathForLocale(defaultLocale, `/projekt/${slug}`));
}
