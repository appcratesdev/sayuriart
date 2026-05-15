import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectPageContent } from "@/components/ProjectPageContent";
import Link from "next/link";
import { getProjectBySlug, getSiteSettings } from "../../../../sanity/lib/fetch";
import { portableTextToPlainText, sanityImageUrl } from "@/lib/sanity-mappers";

const projects: Record<string, {
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  images: string[];
}> = {
  "kosmetyki-naturalne": {
    title: "Kosmetyki naturalne",
    category: "Lifestyle",
    client: "Natural Cosmetics",
    year: "2026",
    description: "Kompletna sesja grafik lifestyle dla marki kosmetykow naturalnych.",
    challenge: "Klient posiadal jedynie zdjecia produktowe na bialym tle.",
    solution: "Powstala seria spojnych grafik lifestyle AI w naturalnym otoczeniu.",
    results: ["12 grafik lifestyle AI", "Materialy do sklepu i social media", "Spojny styl marki", "Gotowe pliki do publikacji"],
    images: Array(6).fill("/images/placeholder.jpg"),
  },
  "kolekcja-zapachow": {
    title: "Kolekcja zapachow",
    category: "Packshot",
    client: "Brixton Home",
    year: "2026",
    description: "Packshoty i grafiki lifestyle dla kolekcji swiec i dyfuzorow.",
    challenge: "Nowa kolekcja potrzebowala kompletnego zestawu grafik.",
    solution: "Przygotowano packshoty, lifestyle i infografiki produktowe.",
    results: ["Packshoty produktowe", "Grafiki lifestyle AI", "Infografiki", "A+ Content"],
    images: Array(5).fill("/images/placeholder.jpg"),
  },
  "swiece-premium": {
    title: "Swiece premium",
    category: "Lifestyle",
    client: "Lux Fragrances",
    year: "2025",
    description: "Grafiki lifestyle dla luksusowej marki swiec sojowych.",
    challenge: "Marka chciala wejsc w segment premium.",
    solution: "Stworzono elegancki, ciemny key visual z detalami premium.",
    results: ["10 grafik lifestyle", "Spojny styl wizualny", "Materialy reklamowe", "Wieksze zaangazowanie"],
    images: Array(5).fill("/images/placeholder.jpg"),
  },
  "ceramika-artystyczna": {
    title: "Ceramika artystyczna",
    category: "Infografiki",
    client: "Terra Ceramics",
    year: "2025",
    description: "Infografiki i lifestyle dla rzemieslniczej marki ceramiki.",
    challenge: "Trzeba bylo pokazac detale recznej roboty.",
    solution: "Polaczono infografiki z naturalnymi scenami lifestyle.",
    results: ["6 infografik", "8 grafik lifestyle", "Zestaw do sklepu", "Materialy katalogowe"],
    images: Array(5).fill("/images/placeholder.jpg"),
  },
  "suplementy-diety": {
    title: "Suplementy diety",
    category: "A+ Content",
    client: "Pure Elements",
    year: "2026",
    description: "Kompletny pakiet Amazon dla marki suplementow.",
    challenge: "Marka startowala na Amazon z kilkoma produktami.",
    solution: "Przygotowano packshoty, lifestyle, infografiki i A+ Content.",
    results: ["Listingi Amazon", "A+ Content", "Grafiki lifestyle AI", "Spojny zestaw"],
    images: Array(6).fill("/images/placeholder.jpg"),
  },
  "bizuteria-premium": {
    title: "Bizuteria premium",
    category: "Packshot",
    client: "Minimalist Studio",
    year: "2025",
    description: "Packshoty i lifestyle dla minimalistycznej bizuterii.",
    challenge: "Bizuteria wymagala precyzyjnego pokazania detali.",
    solution: "Powstaly packshoty i minimalistyczne sceny lifestyle.",
    results: ["Packshoty", "Grafiki lifestyle", "Materialy Instagram", "Spojna identyfikacja"],
    images: Array(5).fill("/images/placeholder.jpg"),
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sanityProject = await getProjectBySlug(slug);
  const project = sanityProject || projects[slug];

  if (!project) return { title: "Projekt - Lifestyle Images" };

  return {
    title: `${project.title} - Lifestyle Images`,
    description:
      "excerpt" in project
        ? project.excerpt || portableTextToPlainText(project.description)
        : project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [sanityProject, siteSettings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);
  const fallbackProject = projects[slug];
  const project = sanityProject
    ? {
        title: sanityProject.title,
        category: sanityProject.category,
        client: sanityProject.client || "Lifestyle Images",
        year: sanityProject.year ? String(sanityProject.year) : "",
        description:
          portableTextToPlainText(sanityProject.description) ||
          sanityProject.excerpt ||
          "",
        challenge: sanityProject.challenge || "",
        solution: sanityProject.solution || "",
        results: sanityProject.results?.length
          ? sanityProject.results
          : sanityProject.services || [],
        images: [
          sanityImageUrl(sanityProject.coverImage, 1600, 900),
          ...(sanityProject.gallery || []).map((image) =>
            sanityImageUrl(image, 1200, 1200)
          ),
        ].filter((image): image is string => Boolean(image)),
      }
    : fallbackProject;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title={siteSettings?.title} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-[var(--foreground)] mb-4">Projekt nie znaleziony</h1>
            <Link href="/#portfolio" className="btn btn-primary">Wroc do portfolio</Link>
          </div>
        </main>
        <Footer
          settings={{
            title: siteSettings?.title,
            email: siteSettings?.email,
            instagram: siteSettings?.socialLinks?.instagram,
            facebook: siteSettings?.socialLinks?.facebook,
            linkedin: siteSettings?.socialLinks?.linkedin,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={siteSettings?.title} />
      <main className="flex-1">
        <ProjectPageContent project={project} />
      </main>
      <Footer
        settings={{
          title: siteSettings?.title,
          email: siteSettings?.email,
          instagram: siteSettings?.socialLinks?.instagram,
          facebook: siteSettings?.socialLinks?.facebook,
          linkedin: siteSettings?.socialLinks?.linkedin,
        }}
      />
    </div>
  );
}
