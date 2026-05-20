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

export const heroQuery = groq`*[_type == "hero"][0]{
  _id,
  _type,
  "title": ${l("title")},
  "subtitle": ${l("subtitle")},
  "ctaText": ${l("ctaText")},
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
  _id,
  _type,
  "title": ${l("title")},
  "description": ${l("description")},
  "features": ${l("features")},
  image${galleryBlockFields},
  order
}`;

export const servicesSectionQuery = groq`*[_type == "servicesSection"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")}
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
  "sectionDescription": ${l("sectionDescription")}
}`;

export const portfolioSectionQuery = groq`*[_type == "portfolio"][0]{
  _id,
  _type,
  "sectionTitle": ${l("sectionTitle")},
  "sectionDescription": ${l("sectionDescription")},
  ${seo()}
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  _type,
  "title": ${l("title")},
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  category,
  "excerpt": ${l("excerpt")},
  coverImage${galleryBlockFields},
  featured,
  order,
  ${seo()}
}`;

export const projectBySlugQuery = groq`*[_type == "project" && coalesce(slug[$lang].current, slug.current) == $slug][0]{
  _id,
  _type,
  "title": ${l("title")},
  "slug": {"current": coalesce(slug[$lang].current, slug.current)},
  category,
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
  "customCta": ${l("customCta")}
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
  "sectionDescription": ${l("sectionDescription")}
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
