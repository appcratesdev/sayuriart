import { redirect } from "next/navigation";
import { pathForLocale, defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  redirect(pathForLocale(defaultLocale));
}
