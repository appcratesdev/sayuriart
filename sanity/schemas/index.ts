import hero from './hero'
import header from './header'
import manifesto from './manifesto'
import service from './service'
import servicePage from './servicePage'
import { galleryBlockType } from './galleryBlock'
import beforeAfter from './beforeAfter'
import beforeAfterSection from './beforeAfterSection'
import portfolio from './portfolio'
import project from './project'
import pricing from './pricing'
import pricingSection from './pricingSection'
import testimonial from './testimonial'
import testimonialsSection from './testimonialsSection'
import process from './process'
import processSection from './processSection'
import servicesSection from './servicesSection'
import faq from './faq'
import faqSection from './faqSection'
import footer from './footer'
import siteSettings from './siteSettings'
import about from './about'
import legalPage from './legalPage'
import {
  localizedBlocks,
  localizedSlug,
  localizedString,
  localizedStringArray,
  localizedText,
  seoFields,
} from './localized'

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedBlocks,
  localizedStringArray,
  localizedSlug,
  seoFields,
  siteSettings,
  galleryBlockType,
  header,
  hero,
  manifesto,
  service,
  servicePage,
  beforeAfter,
  beforeAfterSection,
  portfolio,
  project,
  pricing,
  pricingSection,
  testimonial,
  testimonialsSection,
  process,
  processSection,
  servicesSection,
  faq,
  faqSection,
  footer,
  about,
  legalPage,
]
