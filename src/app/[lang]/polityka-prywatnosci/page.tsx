import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableText } from "@portabletext/react";
import { assertLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { createSanityEdit } from "../../../../sanity/lib/edit";
import { getLegalPageBySlug, getSiteSettings } from "../../../../sanity/lib/fetch";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ lang: string }>;
};

const localizedField = (field: string, locale: string) => `${field}.${locale}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const page = await getLegalPageBySlug("polityka-prywatnosci", locale);

  return buildMetadata({
    locale,
    path: "/polityka-prywatnosci",
    title: page?.seo?.title || page?.title || "Polityka Prywatności",
    description: page?.seo?.description,
  });
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const [page, siteSettings] = await Promise.all([
    getLegalPageBySlug("polityka-prywatnosci", locale),
    getSiteSettings(locale)
  ]);

  if (!page) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[var(--background)] flex flex-col">
      <Header title={siteSettings?.title} titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))} locale={locale} />

      <section className="flex-grow pt-32 pb-24 px-6">
        <div className="container-main mx-auto max-w-4xl">
          <h1 
            className="text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] font-serif text-[var(--foreground)] mb-12"
            data-sanity={createSanityEdit(page, localizedField("title", locale))}
          >
            {page.title}
          </h1>

          <div 
            className="text-body-lg text-black font-light space-y-6 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:text-[var(--foreground)] [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:text-[var(--foreground)] [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>a]:text-[var(--primary)] [&>a]:underline"
            data-sanity={createSanityEdit(page, localizedField("content", locale))}
          >
            {page.content ? (
              <PortableText value={page.content} />
            ) : (
              <p>Treść w przygotowaniu...</p>
            )}
          </div>
        </div>
      </section>

      <Footer settings={siteSettings || undefined} locale={locale} />
    </main>
  );
}
