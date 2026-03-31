import React from 'react'
import './Page5.css'
import back from '../images/back.svg'
import logoWhite from '../images/Logo/glassOnionLogoWithNameWhite.svg'

export default function Page5() {
  return (
    <div className="page page5">

      {/* Full background */}
      <img src={back} alt="" className="p5-bg" />

      {/* Bottom logo */}
      <img src={logoWhite} alt="" className="p5-logo" />

    </div>
  )
}