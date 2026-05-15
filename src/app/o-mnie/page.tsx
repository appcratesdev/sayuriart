import { Header } from "@/components/Header";
import InkFluidWrapper from "@/components/FluidCanvas/InkFluidWrapper";
import Image from "next/image";
import { Palette, Music, Coffee, Leaf } from "lucide-react";
import { getAbout, getSiteSettings } from "../../../sanity/lib/fetch";
import { sanityImageUrl } from "@/lib/sanity-mappers";
import { PortableText } from "@portabletext/react";

export async function generateMetadata() {
  const about = await getAbout();
  return {
    title: about?.seoTitle || "O mnie | Sayuri",
    description:
      about?.seoDescription ||
      "Poznajmy się bliżej. Zobaczmy, co możemy razem stworzyć.",
  };
}

export default async function AboutPage() {
  const about = await getAbout();
  const siteSettings = await getSiteSettings();

  // Default fallbacks
  const title = about?.title || "Ania";
  const role = about?.role || "Art Director / Content & Community";
  const imageSrc =
    (about?.profileImage && sanityImageUrl(about.profileImage, 800, 1000)) ||
    "/images/Ania.webp";
  const imageAlt = about?.profileImage?.alt || "Ania - Art Director";
  const contactTitle = about?.contactTitle || "Zróbmy razem coś wyjątkowego.";
  const contactEmail =
    about?.contactEmail || siteSettings?.email || "annsayuriart@gmail.com";

  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      {/* Canvas jako tło na całej stronie (rośnie wraz z całą zawartością main) */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <InkFluidWrapper />
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>

        {/* Sekcja o mnie - PIERWSZA */}
        <section className="w-full pt-32 pb-24 px-6 pointer-events-auto">
          <div className="container-main mx-auto max-w-7xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Lewa strona - Zdjęcie */}
              <div className="lg:col-span-5 relative group z-10">
                {/* Szklana ramka z rozmyciem (glassmorphism) */}
                <div className="relative p-2 sm:p-3 md:p-4 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/40 shadow-2xl transition-all duration-700 ease-out group-hover:bg-[var(--card)]/40 group-hover:shadow-3xl">
                  {/* Właściwy kontener na zdjęcie */}
                  <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-[var(--muted)] shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.5s] ease-out "
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10 mix-blend-overlay"></div>
                  </div>
                </div>

                {/* Dekoracyjne, rozmyte plamy koloru reagujące na hover */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--gold)]/20 rounded-full blur-[3rem] -z-10 transition-transform duration-700 ease-out group-hover:translate-x-8 group-hover:translate-y-8"></div>
                <div className="absolute -top-6 -left-6 w-56 h-56 bg-[var(--primary)]/15 rounded-full blur-[4rem] -z-10 transition-transform duration-700 ease-out group-hover:-translate-x-8 group-hover:-translate-y-8"></div>
              </div>

              {/* Prawa strona - Treść */}
              <div className="lg:col-span-7 flex flex-col items-start relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-3 rounded-full bg-[var(--muted)] text-[var(--primary)] shadow-sm">
                    <Palette className="w-6 h-6" strokeWidth={1.5} />
                  </span>
                  <span className="overline text-[var(--gold)] tracking-widest">
                    {role}
                  </span>
                </div>

                <h2 className="text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] font-serif text-[var(--foreground)] mb-8">
                  {title}
                </h2>

                <div className="space-y-6 text-body-lg text-black max-w-2xl font-light">
                  {about?.bio ? (
                    <PortableText value={about.bio} />
                  ) : (
                    <>
                      <p>
                        Artystka malarka i pomysłodawczyni Artovni. Od lat
                        tworzy i sprzedaje własną sztukę, dzięki czemu doskonale
                        zna realia pracy twórczej oraz wyzwania, z jakimi mierzą
                        się artyści i rękodzielnicy — od procesu tworzenia,
                        przez promocję, aż po sprzedaż i budowanie własnej
                        marki.
                      </p>
                      <p>
                        W Artovni odpowiada za content, social media oraz
                        kontakt ze sprzedawcami i klientami. Jest pierwszym
                        punktem styku dla Twórców i dba o to, aby platforma była
                        miejscem przyjaznym, transparentnym i realnie
                        wspierającym rozwój kreatywnych marek.
                      </p>
                    </>
                  )}
                </div>

                {/* Sekcja "Po godzinach" */}
                <div className="mt-12 pt-12 border-t border-[var(--border)] w-full">
                  <h3 className="text-xl font-serif text-[var(--foreground)] mb-6">
                    Po godzinach
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 group">
                      <Palette
                        className="w-8 h-8 mb-3 text-[var(--primary)] group-hover:text-[var(--gold)] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Malarstwo
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 group">
                      <Music
                        className="w-8 h-8 mb-3 text-[var(--primary)] group-hover:text-[var(--gold)] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Taniec
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 group">
                      <Leaf
                        className="w-8 h-8 mb-3 text-[var(--primary)] group-hover:text-[var(--gold)] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Natura
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5 group">
                      <Coffee
                        className="w-8 h-8 mb-3 text-[var(--primary)] group-hover:text-[var(--gold)] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium text-[var(--foreground)]">
                        Kawa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja "Zróbmy razem..." - DRUGA */}
        <section className="flex flex-col items-center justify-center min-h-[50svh] px-6 pb-32 pt-12 pointer-events-none mix-blend-multiply">
          <h1
            className="text-[clamp(3.5rem,8vw,9rem)] leading-[1.05] font-serif text-[var(--foreground)] tracking-tight text-center mb-4 md:mb-8"
            dangerouslySetInnerHTML={{
              __html: contactTitle.replace(
                "wyjątkowego.",
                '<span className="text-[var(--gold)] italic">wyjątkowego.</span>',
              ),
            }}
          ></h1>
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
