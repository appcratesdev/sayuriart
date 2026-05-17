import type { SanityImageSource } from "@sanity/image-url";
import { PortableTextBlock } from "@portabletext/types";

export interface SeoFields {
  title?: string;
  description?: string;
  image?: SanityImageSource;
}

export interface SiteSettings {
  title: string;
  description?: string;
  logo?: SanityImageSource;
  email?: string;
  phone?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  seo?: SeoFields;
}

export interface Hero {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: SanityImageSource;
  seo?: SeoFields;
}

export interface Manifesto {
  overline?: string;
  title: string;
  description?: PortableTextBlock[];
  image?: SanityImageSource;
}

export interface Service {
  _id: string;
  title: string;
  description?: string;
  features?: string[];
  image: SanityImageSource;
  order: number;
}

export interface BeforeAfter {
  _id: string;
  title: string;
  description?: string;
  beforeImage: SanityImageSource;
  afterImage: SanityImageSource;
  order: number;
}

export interface PortfolioSection {
  sectionTitle: string;
  sectionDescription?: string;
  seo?: SeoFields;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: "lifestyle" | "product" | "amazon" | "infographics";
  excerpt?: string;
  coverImage: SanityImageSource;
  client?: string;
  year?: number;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  description?: PortableTextBlock[];
  gallery?: Array<{
    asset?: SanityImageSource;
    caption?: string;
  }>;
  featured?: boolean;
  order: number;
  seo?: SeoFields;
}

export interface PricingPackage {
  name: string;
  price: string;
  unit?: string;
  featured: boolean;
  savings?: string;
  originalValue?: string;
  features: string[];
}

export interface Pricing {
  _id: string;
  categoryId: string;
  categoryLabel: string;
  packages: PricingPackage[];
  order: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: SanityImageSource;
  rating: number;
  order: number;
}

export interface Process {
  _id: string;
  number: string;
  title: string;
  description: string;
  iconName: "brief" | "concept" | "creation" | "files";
  order: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export interface About {
  seoTitle?: string;
  seoDescription?: string;
  profileImage?: SanityImageSource & { alt?: string };
  role?: string;
  title?: string;
  bio?: PortableTextBlock[];
  hobbies?: Array<{ name: string; icon: string }>;
  contactTitle?: string;
  contactEmail?: string;
  seo?: SeoFields;
}
