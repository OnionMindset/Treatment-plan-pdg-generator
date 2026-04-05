// ── Supabase Config ───────────────────────────────────────────────
// Update these two values with your actual Supabase project details.
// All image and font URLs are derived from these.

const SUPABASE_PROJECT = 'jyyywqsjfapmtglgqjap'   // e.g. 'xyzabc123'
const IMAGES_BUCKET    = 'treatment-plan'    // bucket where logo & cover live
const FONTS_BUCKET     = 'fonts'          // bucket where fonts live

const BASE = `https://${SUPABASE_PROJECT}.supabase.co/storage/v1/object/public`

import logo      from '../assets/glassOnionLogoWithName.svg'
import cover     from '../assets/cover.svg'
import logoBig   from '../assets/logoBig.svg'
import logoSmall from '../assets/logoSmall.svg'
import back      from '../assets/back.svg'
import logoWhite from '../assets/glassOnionLogoWithNameWhite.svg'

// ── Image assets ──────────────────────────────────────────────────
export const ASSETS = {
  logo,
  cover,
  logoBig,
  logoSmall,
  back,
  logoWhite,

  // ── Dynamic (Supabase) ────────────────────────────────────────
  team: `${BASE}/${IMAGES_BUCKET}/team`,
}

// ── Font URLs ─────────────────────────────────────────────────────
export const FONTS = {
  thin:     `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Thin.woff2`,
  light:    `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Light.woff2`,
  regular:  `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-.woff2`,
  medium:   `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Medium.woff2`,
  semibold: `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Semi-Bold.woff2`,
  bold:     `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Bold.woff2`,
  heavy:    `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Heavy.woff2`,
  black:    `${BASE}/${FONTS_BUCKET}/New%20Kansas/fonnts.com-New-Kansas-Black.woff2`,
}

// ── Preload helper ────────────────────────────────────────────────
export function preloadAllAssets() {
  const images = [
    ASSETS.logo, ASSETS.cover, ASSETS.logoBig,
    ASSETS.logoSmall, ASSETS.back, ASSETS.logoWhite,
  ]
  const fonts = [FONTS.regular, FONTS.medium, FONTS.semibold, FONTS.bold]

  images.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.type = 'image/svg+xml'
    link.href = href
    document.head.appendChild(link)
  })

  fonts.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = href
    document.head.appendChild(link)
  })
}