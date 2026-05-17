import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export interface SanityDocumentMeta {
  _id?: string;
  _type?: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
  image?: SanityImageSource;
}

export interface SiteSettings extends SanityDocumentMeta {
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

export interface Hero extends SanityDocumentMeta {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: SanityImageSource;
  seo?: SeoFields;
}

export interface Manifesto extends SanityDocumentMeta {
  overline?: string;
  title: string;
  description?: PortableTextBlock[];
  image?: SanityImageSource;
}

export interface Service extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  title: string;
  description?: string;
  features?: string[];
  image: SanityImageSource;
  order: number;
}

export interface BeforeAfter extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  title: string;
  description?: string;
  beforeImage: SanityImageSource;
  afterImage: SanityImageSource;
  order: number;
}

export interface PortfolioSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  seo?: SeoFields;
}

export interface Project extends SanityDocumentMeta {
  _id: string;
  _type?: string;
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

export interface Pricing extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  categoryId: string;
  categoryLabel: string;
  packages: PricingPackage[];
  order: number;
}

export interface Testimonial extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  name: string;
  role?: string;
  content: string;
  avatar?: SanityImageSource;
  rating: number;
  order: number;
}

export interface Process extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  number: string;
  title: string;
  description: string;
  iconName: "brief" | "concept" | "creation" | "files";
  order: number;
}

export interface ProcessSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
}

export interface FAQ extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  question: string;
  answer: string;
  order: number;
}

export interface About extends SanityDocumentMeta {
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

export interface LegalPage extends SanityDocumentMeta {
  title: string;
  slug: { current: string };
  content?: PortableTextBlock[];
  seo?: SeoFields;
}
