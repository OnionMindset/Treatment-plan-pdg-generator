// ── Supabase Config ───────────────────────────────────────────────
// Update these two values with your actual Supabase project details.
// All image and font URLs are derived from these.

const SUPABASE_PROJECT = 'jyyywqsjfapmtglgqjap'   // e.g. 'xyzabc123'
const IMAGES_BUCKET    = 'treatment-plan'    // bucket where logo & cover live
const FONTS_BUCKET     = 'fonts'          // bucket where fonts live

const BASE = `https://${SUPABASE_PROJECT}.supabase.co/storage/v1/object/public`

// ── Image assets ──────────────────────────────────────────────────
export const ASSETS = {
  logo:  `${BASE}/${IMAGES_BUCKET}/glassOnionLogoWithName.svg`,
  cover: `${BASE}/${IMAGES_BUCKET}/cover.svg`,
  logoBig: `${BASE}/${IMAGES_BUCKET}/logoBig.svg`,
  logoSmall: `${BASE}/${IMAGES_BUCKET}/logoSmall.svg`,
  back: `${BASE}/${IMAGES_BUCKET}/back.svg`,
  logoWhite: `${BASE}/${IMAGES_BUCKET}/glassOnionLogoWithNameWhite.svg`,
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
