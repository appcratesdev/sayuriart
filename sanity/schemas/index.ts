import hero from './hero'
import manifesto from './manifesto'
import service from './service'
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
  hero,
  manifesto,
  service,
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
  about,
  legalPage,
]
