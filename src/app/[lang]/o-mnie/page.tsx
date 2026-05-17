import { Header } from "@/components/Header";
import InkFluidWrapper from "@/components/FluidCanvas/InkFluidWrapper";
import Image from "next/image";
import { Coffee, Leaf, Music, Palette } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { assertLocale, getDictionary, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { sanityImageUrl } from "@/lib/sanity-mappers";
import { getAbout, getSiteSettings } from "../../../../sanity/lib/fetch";

type Props = {
  params: Promise<{ lang: string }>;
};

const hobbyIcons = {
  palette: Palette,
  music: Music,
  leaf: Leaf,
  coffee: Coffee,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const dict = getDictionary(locale);
  const about = await getAbout(locale);
  const image = sanityImageUrl(about?.seo?.image || about?.profileImage, 1200, 630);

  return buildMetadata({
    locale,
    path: "/o-mnie",
    title: about?.seo?.title || about?.seoTitle || dict.about.seoTitle,
    description: about?.seo?.description || about?.seoDescription || dict.about.seoDescription,
    image,
  });
}

export default async function AboutPage({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const dict = getDictionary(locale);
  const [about, siteSettings] = await Promise.all([getAbout(locale), getSiteSettings(locale)]);

  const title = about?.title || dict.about.defaultTitle;
  const role = about?.role || dict.about.defaultRole;
  const imageSrc = (about?.profileImage && sanityImageUrl(about.profileImage, 800, 1000)) || "/images/Ania.webp";
  const imageAlt = about?.profileImage?.alt || dict.about.defaultImageAlt;
  const contactTitle = about?.contactTitle || dict.about.contactTitle;
  const contactEmail = about?.contactEmail || siteSettings?.email || "annsayuriart@gmail.com";
  const hobbies =
    about?.hobbies?.length
      ? about.hobbies
      : [
          { icon: "palette", name: dict.about.hobbies.palette },
          { icon: "music", name: dict.about.hobbies.music },
          { icon: "leaf", name: dict.about.hobbies.leaf },
          { icon: "coffee", name: dict.about.hobbies.coffee },
        ];

  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <InkFluidWrapper />
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Header title={siteSettings?.title} locale={locale} />
        </div>

        <section className="w-full pt-32 pb-24 px-6 pointer-events-auto">
          <div className="container-main mx-auto max-w-7xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <div className="lg:col-span-5 relative group z-10">
                <div className="relative p-2 sm:p-3 md:p-4 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/40 shadow-2xl transition-all duration-700 ease-out group-hover:bg-[var(--card)]/40 group-hover:shadow-3xl">
                  <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-[var(--muted)] shadow-inner">
                    <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out" priority />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10 mix-blend-overlay" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-start relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-3 rounded-full bg-[var(--muted)] text-[var(--primary)] shadow-sm">
                    <Palette className="w-6 h-6" strokeWidth={1.5} />
                  </span>
                  <span className="overline text-[var(--gold)] tracking-widest">{role}</span>
                </div>

                <h1 className="text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] font-serif text-[var(--foreground)] mb-8">
                  {title}
                </h1>

                <div className="space-y-6 text-body-lg text-black max-w-2xl font-light">
                  {about?.bio ? (
                    <PortableText value={about.bio} />
                  ) : (
                    <p>{dict.about.seoDescription}</p>
                  )}
                </div>

                <div className="mt-12 pt-12 border-t border-[var(--border)] w-full">
                  <h2 className="text-xl font-serif text-[var(--foreground)] mb-6">{dict.about.hobbiesTitle}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {hobbies.map((hobby) => {
                      const Icon = hobbyIcons[hobby.icon as keyof typeof hobbyIcons] || Palette;
                      return (
                        <div key={`${hobby.icon}-${hobby.name}`} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 group">
                          <Icon className="w-8 h-8 mb-3 text-[var(--primary)] group-hover:text-[var(--gold)] transition-colors duration-300" strokeWidth={1.5} />
                          <span className="text-sm font-medium text-[var(--foreground)]">{hobby.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center min-h-[50svh] px-6 pb-32 pt-12 pointer-events-none mix-blend-multiply">
          <h2 className="text-[clamp(3.5rem,8vw,9rem)] leading-[1.05] font-serif text-[var(--foreground)] tracking-tight text-center mb-4 md:mb-8">
            {contactTitle}
          </h2>
          <a
            href={`mailto:${contactEmail}`}
            className="text-[clamp(1.5rem,3.5vw,4rem)] text-[var(--foreground)] font-sans font-light pointer-events-auto hover:text-[var(--gold)] transition-colors"
          >
            {contactEmail}
          </a>
        </section>
      </div>
    </main>
  );
}
