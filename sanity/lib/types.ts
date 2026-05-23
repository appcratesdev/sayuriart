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
  secondaryCtaText?: string;
  ctaLink?: string;
  heroImage?: SanityImageSource;
  seo?: SeoFields;
}

export interface HeaderContent extends SanityDocumentMeta {
  servicesLabel?: string;
  portfolioLabel?: string;
  pricingLabel?: string;
  processLabel?: string;
  aboutLabel?: string;
  ctaLabel?: string;
  menuLabel?: string;
  closeLabel?: string;
  polishLocaleLabel?: string;
  englishLocaleLabel?: string;
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
  pageSlug?: {
    current: string;
  };
  description?: string;
  features?: string[];
  image: GalleryBlock;
  order: number;
}

export interface ServicePage extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  slug?: {
    current: string;
  };
  service?: Service;
  pageOverline?: string;
  backLinkText?: string;
  pageTitle?: string;
  pageLead?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  problemsTitle?: string;
  problemsIntro?: string;
  problems?: Array<{ _key?: string; title: string; description?: string }>;
  benefitsTitle?: string;
  benefitsIntro?: string;
  benefits?: Array<{ _key?: string; title: string; description?: string }>;
  detailsTitle?: string;
  detailsBody?: PortableTextBlock[];
  faqTitle?: string;
  faqItems?: Array<{ _key?: string; question: string; answer: string }>;
  relatedProjectsTitle?: string;
  relatedProjectsIntro?: string;
  relatedProjects?: Project[];
  relatedProjectsCtaText?: string;
  otherServicesTitle?: string;
  otherServicesIntro?: string;
  otherServicesCtaText?: string;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryText?: string;
  finalCtaPrimaryLink?: string;
  finalCtaSecondaryText?: string;
  finalCtaSecondaryLink?: string;
  heroImage?: SanityImageSource;
  seo?: SeoFields;
}

export interface BeforeAfter extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  title: string;
  description?: string;
  beforeImage: GalleryBlock;
  afterImage: GalleryBlock;
  order: number;
}

export interface BeforeAfterSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  beforeLabel?: string;
  afterLabel?: string;
  instruction?: string;
}

export interface ServicesSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  ctaText?: string;
  servicePageCtaText?: string;
}

export interface PortfolioSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  allFilterLabel?: string;
  openProjectLabel?: string;
  seo?: SeoFields;
}

export interface GalleryImage {
  _key?: string;
  _type?: string;
  image?: SanityImageSource & {
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
  };
  aspectRatio?: string;
  customAspectRatio?: string;
  objectPositionX?: number;
  objectPositionY?: number;
}

export interface GalleryBlock {
  _key?: string;
  _type?: string;
  layout?: string;
  aspectRatio?: string;
  customAspectRatio?: string;
  images?: GalleryImage[];
}

export interface Project extends SanityDocumentMeta {
  _id: string;
  _type?: string;
  title: string;
  slug: {
    current: string;
  };
  category: "lifestyle" | "product" | "amazon" | "infographics";
  categoryLabel?: string;
  excerpt?: string;
  coverImage: GalleryBlock;
  client?: string;
  year?: number;
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  description?: PortableTextBlock[];
  gallery?: GalleryBlock[];
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

export interface PricingSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  customQuestion?: string;
  customCta?: string;
  popularLabel?: string;
  orderLabel?: string;
  currencyLabel?: string;
  savingsLabel?: string;
  orderMessageTemplate?: string;
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

export interface TestimonialsSection extends SanityDocumentMeta {
  sectionTitle: string;
  sectionDescription?: string;
  previousLabel?: string;
  nextLabel?: string;
  goToSlideLabel?: string;
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

export interface FAQSection extends SanityDocumentMeta {
  sectionTitle?: string;
  sectionDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactCta?: string;
}

export interface FooterContent extends SanityDocumentMeta {
  headingStart?: string;
  headingAccent?: string;
  description?: string;
  emailLabel?: string;
  socialLabel?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailInputLabel?: string;
  emailPlaceholder?: string;
  typeLabel?: string;
  projectTypes?: Array<{ _key?: string; value: string; label: string }>;
  messageLabel?: string;
  messagePlaceholder?: string;
  attachmentLabel?: string;
  attachmentHelpText?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  nameRequiredError?: string;
  emailRequiredError?: string;
  emailInvalidError?: string;
  messageRequiredError?: string;
  messageTooLongError?: string;
  attachmentTypeError?: string;
  attachmentSizeError?: string;
  privacyLabel?: string;
  termsLabel?: string;
  developerLabel?: string;
  rightsText?: string;
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
