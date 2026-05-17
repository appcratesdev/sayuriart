import { redirect } from "next/navigation";
import { defaultLocale, pathForLocale } from "@/lib/i18n";

export default function LegacyAboutPage() {
  redirect(pathForLocale(defaultLocale, "/o-mnie"));
}
