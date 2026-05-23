import { groq } from "next-sanity";

const l = (field: string) => `coalesce(${field}[$lang], ${field}.pl, ${field}.en, ${field})`;
const seo = (field = "seo") => `"seo": {
  "title": ${l(`${field}.title`)},
  "description": ${l(`${field}.description`)},
  "image": ${field}.image
}`;

const galleryBlockFields = `{
  _key,
  _type,
  layout,
  aspectRatio,
  customAspectRatio,
  images[]{
    _key,
    _type,
    image{
      asset->{_id, url, metadata{dimensions{width, height}}},
      hotspot,
      crop
    },
    aspectRatio,
    customAspectRatio,
    objectPositionX,
    objectPositionY
  }
}`;

const serviceCardFields = `
  _id,
  _type,
  "title": ${l("title")},
  "description": ${l("description")},
  "features": ${l("features")},
  image${galleryBlockFields},
  order
`;

const projectCardFields = `
  _id,
  _type,
  "title": ${l("title")},
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  category,
  "categoryLabel": ${l("categoryLabel")},
  "excerpt": ${l("excerpt")},
  coverImage${galleryBlockFields},
  featured,
  order,
  ${seo()}
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  _type,
  "title": ${l("title")},
  "description": ${l("description")},
  logo,
  email,
  phone,
  socialLinks,
  ${seo()}
}`;

export const headerQuery = groq`*[_type == "header"][0]{
  _id,
  _type,
  "servicesLabel": ${l("servicesLabel")},
  "portfolioLabel": ${l("portfolioLabel")},
  "pricingLabel": ${l("pricingLabel")},
  "processLabel": ${l("processLabel")},
  "aboutLabel": ${l("aboutLabel")},
  "ctaLabel": ${l("ctaLabel")},
  "menuLabel": ${l("menuLabel")},
  "closeLabel": ${l("closeLabel")},
  polishLocaleLabel,
  englishLocaleLabel
}`;

export const heroQuery = groq`*[_type == "hero"][0]{
  _id,
  _type,
  "title": ${l("title")},
  "subtitle": ${l("subtitle")},
  "ctaText": ${l("ctaText")},
  "secondaryCtaText": ${l("secondaryCtaText")},
  ctaLink,
  heroImage,
  ${seo()}
}`;

export const manifestoQuery = groq`*[_type == "manifesto"][0]{
  _id,
  _type,
  "overline": ${l("overline")},
  "title": ${l("title")},
  "description": ${l("description")},
  image
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  ${serviceCardFields},
  "pageSlug": *[_type == "servicePage" && references(^._id)][0].{
    "current": coalesce(slug[$lang].current, slug.current)
  }
}`;

export const servicePagesQuery = groq`*[_type == "servicePage"] | order(coalesce(service->order, 999) asc){
  _id,
  _type,
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  "pageTitle": ${l("pageTitle")},
  "pageLead": ${l("pageLead")},
  service->{
    ${serviceCardFields}
  }
}`;

export const servicePageBySlugQuery = groq`*[_type == "servicePage" && coalesce(slug[$lang].current, slug.current) == $slug][0]{
  _id,
  _type,
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  service->{
    ${serviceCardFields}
  },
  "pageOverline": ${l("pageOverline")},
  "backLinkText": ${l("backLinkText")},
  "pageTitle": ${l("pageTitle")},
  "pageLead": ${l("pageLead")},
  heroImage,
  "heroCtaText": ${l("heroCtaText")},
  heroCtaLink,
  "problemsTitle": ${l("problemsTitle")},
  "problemsIntro": ${l("problemsIntro")},
  problems[]{
    _key,
    "title": ${l("title")},
    "description": ${l("description")}
  },
  "benefitsTitle": ${l("benefitsTitle")},
  "benefitsIntro": ${l("benefitsIntro")},
  benefits[]{
    _key,
    "title": ${l("title")},
    "description": ${l("description")}
  },
  "detailsTitle": ${l("detailsTitle")},
  "detailsBody": ${l("detailsBody")},
  "faqTitle": ${l("faqTitle")},
  faqItems[]{
    _key,
    "question": ${l("question")},
    "answer": ${l("answer")}
  },
  "relatedProjectsTitle": ${l("relatedProjectsTitle")},
  "relatedProjectsIntro": ${l("relatedProjectsIntro")},
  relatedProjects[]->{
    ${projectCardFields}
  },
  "relatedProjectsCtaText": ${l("relatedProjectsCtaText")},
  "otherServicesTitle": ${l("otherServicesTitle")},
  "otherServicesIntro": ${l("otherServicesIntro")},
  "otherServicesCtaText": ${l("otherServicesCtaText")},
  "finalCtaTitle": ${l("finalCtaTitle")},
  "finalCtaDescription": ${l("finalCtaDescription")},
  "finalCtaPrimaryText": ${l("finalCtaPrimaryText")},
  finalCtaPrimaryLink,
  "finalCtaSecondaryText": ${l("finalCtaSecondaryText")},
  finalCtaSecondaryLink,
  ${seo()}
}`;

export const servicesSectionQuery = groq`*[_type == "servicesSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "ctaText": ${l("ctaText")},
  "servicePageCtaText": ${l("servicePageCtaText")}
}`;

export const beforeAfterQuery = groq`*[_type == "beforeAfter"] | order(order asc){
  _id,
  _type,
  "title": ${l("title")},
  "description": ${l("description")},
  beforeImage${galleryBlockFields},
  afterImage${galleryBlockFields},
  order
}`;

export const beforeAfterSectionQuery = groq`*[_type == "beforeAfterSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "beforeLabel": ${l("beforeLabel")},
  "afterLabel": ${l("afterLabel")},
  "instruction": ${l("instruction")}
}`;

export const portfolioSectionQuery = groq`*[_type == "portfolio"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "allFilterLabel": ${l("allFilterLabel")},
  "openProjectLabel": ${l("openProjectLabel")},
  ${seo()}
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  ${projectCardFields}
}`;

export const projectBySlugQuery = groq`*[_type == "project" && coalesce(slug[$lang].current, slug.current) == $slug][0]{
  _id,
  _type,
  "title": ${l("title")},
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  category,
  "categoryLabel": ${l("categoryLabel")},
  "excerpt": ${l("excerpt")},
  coverImage${galleryBlockFields},
  client,
  year,
  "services": ${l("services")},
  "challenge": ${l("challenge")},
  "solution": ${l("solution")},
  "results": ${l("results")},
  "description": ${l("description")},
  gallery[]${galleryBlockFields},
  ${seo()}
}`;

export const pricingQuery = groq`*[_type == "pricing"] | order(order asc){
  _id,
  _type,
  categoryId,
  "categoryLabel": ${l("categoryLabel")},
  packages[]{
    "name": ${l("name")},
    price,
    "unit": ${l("unit")},
    featured,
    savings,
    originalValue,
    "features": ${l("features")}
  },
  order
}`;

export const pricingSectionQuery = groq`*[_type == "pricingSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "customQuestion": ${l("customQuestion")},
  "customCta": ${l("customCta")},
  "popularLabel": ${l("popularLabel")},
  "orderLabel": ${l("orderLabel")},
  "currencyLabel": ${l("currencyLabel")},
  "savingsLabel": ${l("savingsLabel")},
  "orderMessageTemplate": ${l("orderMessageTemplate")}
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  _type,
  name,
  "role": ${l("role")},
  "content": ${l("content")},
  avatar,
  rating,
  order
}`;

export const testimonialsSectionQuery = groq`*[_type == "testimonialsSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "previousLabel": ${l("previousLabel")},
  "nextLabel": ${l("nextLabel")},
  "goToSlideLabel": ${l("goToSlideLabel")}
}`;

export const processSectionQuery = groq`*[_type == "processSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")}
}`;

export const processQuery = groq`*[_type == "process"] | order(order asc){
  _id,
  _type,
  number,
  "title": ${l("title")},
  "description": ${l("description")},
  iconName,
  order
}`;

export const faqQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  _type,
  "question": ${l("question")},
  "answer": ${l("answer")},
  order
}`;

export const faqSectionQuery = groq`*[_type == "faqSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  "contactTitle": ${l("contactTitle")},
  "contactDescription": ${l("contactDescription")},
  "contactCta": ${l("contactCta")}
}`;

export const footerQuery = groq`*[_type == "footer"][0]{
  _id,
  _type,
  "headingStart": ${l("headingStart")},
  "headingAccent": ${l("headingAccent")},
  "description": ${l("description")},
  "emailLabel": ${l("emailLabel")},
  "socialLabel": ${l("socialLabel")},
  "nameLabel": ${l("nameLabel")},
  "namePlaceholder": ${l("namePlaceholder")},
  "emailInputLabel": ${l("emailInputLabel")},
  "emailPlaceholder": ${l("emailPlaceholder")},
  "typeLabel": ${l("typeLabel")},
  projectTypes[]{
    _key,
    value,
    "label": ${l("label")}
  },
  "messageLabel": ${l("messageLabel")},
  "messagePlaceholder": ${l("messagePlaceholder")},
  "attachmentLabel": ${l("attachmentLabel")},
  "attachmentHelpText": ${l("attachmentHelpText")},
  "submitLabel": ${l("submitLabel")},
  "submittingLabel": ${l("submittingLabel")},
  "successMessage": ${l("successMessage")},
  "errorMessage": ${l("errorMessage")},
  "nameRequiredError": ${l("nameRequiredError")},
  "emailRequiredError": ${l("emailRequiredError")},
  "emailInvalidError": ${l("emailInvalidError")},
  "messageRequiredError": ${l("messageRequiredError")},
  "messageTooLongError": ${l("messageTooLongError")},
  "attachmentTypeError": ${l("attachmentTypeError")},
  "attachmentSizeError": ${l("attachmentSizeError")},
  "privacyLabel": ${l("privacyLabel")},
  "termsLabel": ${l("termsLabel")},
  "developerLabel": ${l("developerLabel")},
  "rightsText": ${l("rightsText")}
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  _id,
  _type,
  "seoTitle": ${l("seoTitle")},
  "seoDescription": ${l("seoDescription")},
  profileImage,
  "role": ${l("role")},
  "title": ${l("title")},
  "bio": ${l("bio")},
  hobbies[]{
    icon,
    "name": ${l("name")}
  },
  "contactTitle": ${l("contactTitle")},
  contactEmail,
  ${seo()}
}`;

export const legalPageQuery = groq`*[_type == "legalPage" && coalesce(slug[$lang].current, slug.current) == $slug][0]{
  _id,
  _type,
  "title": ${l("title")},
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  "content": ${l("content")},
  ${seo()}
}`;
