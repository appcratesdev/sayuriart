import hero from './hero'
import manifesto from './manifesto'
import service from './service'
import beforeAfter from './beforeAfter'
import portfolio from './portfolio'
import project from './project'
import pricing from './pricing'
import testimonial from './testimonial'
import process from './process'
import faq from './faq'
import siteSettings from './siteSettings'
import about from './about'
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
  portfolio,
  project,
  pricing,
  testimonial,
  process,
  faq,
  about,
]
