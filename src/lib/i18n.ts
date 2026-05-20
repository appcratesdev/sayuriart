export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const localeLabels: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
};

export const localeOpenGraph: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
};

export const isLocale = (value: string | undefined): value is Locale =>
  Boolean(value && locales.includes(value as Locale));

export function assertLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function pathForLocale(locale: Locale, path = "/") {
  if (!path || path === "/") return `/${locale}`;
  if (path.startsWith("#")) return `/${locale}${path}`;
  if (path.startsWith("/")) return `/${locale}${path}`;
  return `/${locale}/${path}`;
}

export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const stripped = `/${parts.slice(2).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return pathForLocale(locale, stripLocale(pathname));
}

export function localizedHref(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href.startsWith("#")) return href;
  return pathForLocale(locale, href);
}

export const dictionary = {
  pl: {
    nav: {
      services: "Uslugi",
      portfolio: "Portfolio",
      pricing: "Cennik",
      process: "Proces",
      about: "O mnie",
      cta: "Rozpocznij projekt",
      menu: "Menu",
      close: "Zamknij menu",
    },
    home: {
      defaultTitle: "Lifestyle Images - Realistyczne grafiki produktowe",
      defaultDescription:
        "Estetyczne grafiki lifestyle, packshoty, infografiki produktowe i A+ Content dla e-commerce i Amazon.",
      heroSecondaryCta: "Zobacz prace",
      servicesTitle: "Co moge dla Ciebie zrobic",
      servicesDescription:
        "Kompleksowe uslugi graficzne dopasowane do potrzeb Twojego e-commerce, marketplace i social media.",
      servicesCta: "Zobacz cennik",
      portfolioTitle: "Wybrane prace",
      portfolioDescription:
        "Kazdy projekt traktujemy jak inwestycje w Twoja marke - nie tylko piekno, ale przede wszystkim wyzsza konwersje.",
      portfolioAll: "Wszystko",
      portfolioOpen: "Zobacz projekt",
      pricingTitle: "Transparentne ceny",
      pricingDescription: "Wybierz pakiet dopasowany do swoich potrzeb. Bez ukrytych kosztow.",
      pricingPopular: "Popularny",
      pricingOrder: "Zamów pakiet",
      pricingCurrency: "zl",
      pricingSavings: "Oszczedzasz",
      pricingCustomQuestion: "Potrzebujesz czegos innego?",
      pricingCustomCta: "Napisz do mnie - indywidualna wycena",
      testimonialsTitle: "Opinie klientow",
      testimonialsDescription:
        "Zaufali mi liderzy e-commerce, ktorzy nie godza sie na kompromisy wizualne.",
      processTitle: "Jak wyglada wspolpraca",
      processDescription: "Od briefu do gotowych plikow - wspolpraca przejrzysta na kazdym etapie.",
      faqTitle: "Najczestsze pytania",
      faqDescription: "Zanim napiszesz, sprawdz odpowiedzi na najczestsze pytania.",
      faqCta: "Zapytaj o projekt",
    },
    project: {
      fallbackTitle: "Projekt - Lifestyle Images",
      notFoundTitle: "Projekt nie znaleziony",
      backToPortfolio: "Wroc do portfolio",
      client: "Klient",
      year: "Rok",
      challenge: "Wyzwanie",
      solution: "Rozwiazanie",
      results: "Rezultaty",
      similarTitle: "Chcesz podobne efekty?",
      similarDescription:
        "Napisz do mnie - przygotuje grafiki, ktore wyroznia Twoj produkt.",
      similarCta: "Rozpocznij projekt",
      imageAlt: "grafika",
      zoomAlt: "powiekszenie",
    },
    about: {
      seoTitle: "O mnie | Sayuri",
      seoDescription: "Poznajmy sie blizej. Zobaczmy, co mozemy razem stworzyc.",
      defaultRole: "Art Director / Content & Community",
      defaultTitle: "Ania",
      defaultImageAlt: "Ania - Art Director",
      hobbiesTitle: "Po godzinach",
      contactTitle: "Zrobmy razem cos wyjatkowego.",
      contactHighlight: "wyjatkowego.",
      hobbies: {
        palette: "Malarstwo",
        music: "Taniec",
        leaf: "Natura",
        coffee: "Kawa",
      },
    },
    footer: {
      headingStart: "Rozpocznijmy",
      headingAccent: "wspolprace.",
      description: "Wypelnij formularz, a wroce do Ciebie z propozycja w ciagu 24 godzin.",
      email: "Email",
      social: "Social media",
      nameLabel: "Imie i nazwisko",
      namePlaceholder: "Jak sie nazywasz?",
      emailLabel: "Adres email",
      emailPlaceholder: "jan@firma.pl",
      typeLabel: "Czego dotyczy projekt?",
      messageLabel: "Opis projektu (opcjonalnie)",
      messagePlaceholder: "Link do sklepu, opis produktu...",
      submit: "Wyslij zapytanie",
      privacy: "Polityka prywatnosci",
      terms: "Regulamin",
      rights: "Wszystkie prawa zastrzezone.",
      options: {
        lifestyle: "Grafiki lifestyle",
        packshots: "Packshoty na bialym tle",
        infographics: "Infografiki produktowe",
        amazon: "A+ Content / Amazon",
        package: "Pakiet grafik",
        subscription: "Subskrypcja",
        other: "Inne",
      },
    },
  },
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      pricing: "Pricing",
      process: "Process",
      about: "About",
      cta: "Start a project",
      menu: "Menu",
      close: "Close menu",
    },
    home: {
      defaultTitle: "Lifestyle Images - Realistic product visuals",
      defaultDescription:
        "Lifestyle images, packshots, product infographics and A+ Content for e-commerce and Amazon.",
      heroSecondaryCta: "View work",
      servicesTitle: "What I can create for you",
      servicesDescription:
        "Complete visual services tailored to your e-commerce, marketplace and social media needs.",
      servicesCta: "See pricing",
      portfolioTitle: "Selected work",
      portfolioDescription:
        "Every project is treated as an investment in your brand: beauty, clarity and stronger conversion.",
      portfolioAll: "All",
      portfolioOpen: "View project",
      pricingTitle: "Transparent pricing",
      pricingDescription: "Choose the package that fits your needs. No hidden costs.",
      pricingPopular: "Popular",
      pricingOrder: "Order package",
      pricingCurrency: "PLN",
      pricingSavings: "You save",
      pricingCustomQuestion: "Need something else?",
      pricingCustomCta: "Message me for a custom quote",
      testimonialsTitle: "Client feedback",
      testimonialsDescription:
        "Trusted by e-commerce teams that do not compromise on product visuals.",
      processTitle: "How we work",
      processDescription: "From brief to final files: a clear process at every step.",
      faqTitle: "Frequently asked questions",
      faqDescription: "Check the most common answers before you get in touch.",
      faqCta: "Ask about a project",
    },
    project: {
      fallbackTitle: "Project - Lifestyle Images",
      notFoundTitle: "Project not found",
      backToPortfolio: "Back to portfolio",
      client: "Client",
      year: "Year",
      challenge: "Challenge",
      solution: "Solution",
      results: "Results",
      similarTitle: "Want similar results?",
      similarDescription:
        "Send me a message and I will prepare visuals that make your product stand out.",
      similarCta: "Start a project",
      imageAlt: "visual",
      zoomAlt: "zoomed image",
    },
    about: {
      seoTitle: "About | Sayuri",
      seoDescription: "Get to know me and see what we can create together.",
      defaultRole: "Art Director / Content & Community",
      defaultTitle: "Ania",
      defaultImageAlt: "Ania - Art Director",
      hobbiesTitle: "After hours",
      contactTitle: "Let's create something exceptional together.",
      contactHighlight: "exceptional",
      hobbies: {
        palette: "Painting",
        music: "Dance",
        leaf: "Nature",
        coffee: "Coffee",
      },
    },
    footer: {
      headingStart: "Let's start",
      headingAccent: "working together.",
      description: "Fill in the form and I will reply with a proposal within 24 hours.",
      email: "Email",
      social: "Social media",
      nameLabel: "Full name",
      namePlaceholder: "What is your name?",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      typeLabel: "What is the project about?",
      messageLabel: "Project description (optional)",
      messagePlaceholder: "Store link, product details...",
      submit: "Send inquiry",
      privacy: "Privacy policy",
      terms: "Terms",
      rights: "All rights reserved.",
      options: {
        lifestyle: "Lifestyle images",
        packshots: "White background packshots",
        infographics: "Product infographics",
        amazon: "A+ Content / Amazon",
        package: "Visual package",
        subscription: "Subscription",
        other: "Other",
      },
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
