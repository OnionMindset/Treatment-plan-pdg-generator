import React, { useState } from 'react'
import { ASSETS } from '../config/supabase'
import './Page1.css'

export default function Page1({ data }) {
  const [logoError, setLogoError] = useState(false)
  const [coverError, setCoverError] = useState(false)

  return (
    
    <div className="page1">

      {/* Top */}
      <div className="top">

        <div className="logo-wrap">
          {!logoError ? (
            <img
              src={ASSETS.logo}
              alt="logo"
              className="logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="logo-fallback">
              glass onion therapy
            </div>
          )}
        </div>

        <h1 className="title">
          treatment plan
        </h1>

        <div className="pills">
          <span className="pill name">
            for {data?.customerName || '—'}
          </span>
          <span className="pill date">
            {data?.createdAt || '—'}
          </span>
        </div>

      </div>

      {/* Bottom */}
      <div className="bottom">
        {!coverError ? (
          <img
            src={ASSETS.cover}
            alt="cover"
            className="cover"
            onError={() => setCoverError(true)}
          />
        ) : (
          <div className="cover-fallback" />
        )}

        <div className="tagline">
          your mind, reimagined.
        </div>
      </div>

    </div>
  )
}