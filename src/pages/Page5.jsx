import React from 'react'
import { ASSETS } from '../config/supabase'
import './Page5.css'

export default function Page5() {
  return (
    <div className="page page5">

      {/* Full background */}
      <img src={ASSETS.back} alt="" className="p5-bg" loading="lazy"/>

      {/* Bottom logo */}
      <img src={ASSETS.logoWhite} alt="" className="p5-logo" loading="lazy"/>

    </div>
  )
}