const SUPABASE_PROJECT = 'jyyywqsjfapmtglgqjap'
const FONTS_BUCKET     = 'fonts'
const BASE = `https://${SUPABASE_PROJECT}.supabase.co/storage/v1/object/public`

// ── Static asset imports ──────────────────────────────────────────
import logo      from '../assets/glassOnionLogoWithName.svg'
import cover     from '../assets/cover.svg'
import logoBig   from '../assets/logoBig.svg'
import logoSmall from '../assets/logoSmall.svg'
import back      from '../assets/back.svg'
import logoWhite from '../assets/glassOnionLogoWithNameWhite.svg'

// ── Team avatar imports ───────────────────────────────────────────
import DrMerlyn_Avatar      from '../assets/team/DrMerlyn-Avatar.svg'
import DrMerlyn_Therapist   from '../assets/team/DrMerlyn-Therapist.svg'
import DrNishitaC_Avatar    from '../assets/team/DrNishitaC-Avatar.svg'
import DrNishitaC_Therapist from '../assets/team/DrNishitaC-Therapist.svg'
import DrSamarth_Avatar     from '../assets/team/DrSamarth-Avatar.svg'
import DrSamarth_Therapist  from '../assets/team/DrSamarth-Therapist.svg'
import Pranaamya_Avatar     from '../assets/team/Pranaamya-Avatar.svg'
import Pranaamya_Therapist  from '../assets/team/Pranaamya-Therapist.svg'
import Sahana_Avatar        from '../assets/team/Sahana-Avatar.svg'
import Sahana_Therapist     from '../assets/team/Sahana-Therapist.svg'
import Seema_Avatar         from '../assets/team/Seema-Avatar.svg'
import Seema_Therapist      from '../assets/team/Seema-Therapist.svg'

export const ASSETS = {
  logo, cover, logoBig, logoSmall, back, logoWhite,

  // Keyed by name for easy lookup
  team: {
    DrMerlyn:   { avatar: DrMerlyn_Avatar,   therapist: DrMerlyn_Therapist },
    DrNishitaC: { avatar: DrNishitaC_Avatar, therapist: DrNishitaC_Therapist },
    DrSamarth:  { avatar: DrSamarth_Avatar,  therapist: DrSamarth_Therapist },
    Pranaamya:  { avatar: Pranaamya_Avatar,  therapist: Pranaamya_Therapist },
    Sahana:     { avatar: Sahana_Avatar,     therapist: Sahana_Therapist },
    Seema:      { avatar: Seema_Avatar,      therapist: Seema_Therapist },
  }
}

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

export function preloadAllAssets() {
  // Only fonts need preloading now — all images are bundled
  const fonts = [FONTS.regular, FONTS.medium, FONTS.semibold, FONTS.bold]
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