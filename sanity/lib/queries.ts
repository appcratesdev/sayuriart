import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

// Hero
export const heroQuery = groq`*[_type == "hero"][0]{
  title,
  subtitle,
  ctaText,
  ctaLink,
  heroImage
}`;

// Manifesto
export const manifestoQuery = groq`*[_type == "manifesto"][0]{
  overline,
  title,
  description,
  image
}`;

// Services
export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  description,
  features,
  image,
  order
}`;

// Before/After
export const beforeAfterQuery = groq`*[_type == "beforeAfter"] | order(order asc){
  _id,
  title,
  description,
  beforeImage,
  afterImage,
  order
}`;

// Portfolio Section
export const portfolioSectionQuery = groq`*[_type == "portfolio"][0]{
  sectionTitle,
  sectionDescription
}`;

// Projects
export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  _id,
  title,
  slug,
  category,
  excerpt,
  coverImage,
  featured,
  order
}`;

// Single Project
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category,
  excerpt,
  coverImage,
  client,
  year,
  services,
  challenge,
  solution,
  results,
  description,
  gallery
}`;

// Pricing
export const pricingQuery = groq`*[_type == "pricing"] | order(order asc){
  _id,
  categoryId,
  categoryLabel,
  packages,
  order
}`;

// Testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  role,
  content,
  avatar,
  rating,
  order
}`;

// Process
export const processQuery = groq`*[_type == "process"] | order(order asc){
  _id,
  number,
  title,
  description,
  iconName,
  order
}`;

// FAQ
export const faqQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  order
}`;

// About
export const aboutQuery = groq`*[_type == "about"][0]{
  seoTitle,
  seoDescription,
  profileImage,
  role,
  title,
  bio,
  hobbies,
  contactTitle,
  contactEmail
}`;
