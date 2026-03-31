import React from 'react'
import { ASSETS } from '../config/supabase'
import './Page3.css'
import logoSmall from '../images/Logo/logoSmall.svg'

export default function Page3({ data }) {
  // ── Fallback avatar
  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=6b1212&color=f5f0e8&size=200&rounded=true`

  // ── Format name → "Dr. Samarth" → "DrSamarth"
  const formatName = (name) =>
    name.trim().replace(/\./g, '').replace(/\s+/g, '')

  // ── Supabase avatar
  const getTherapistAvatar = (name) => {
    if (!name) return ''
    const fileName = `${formatName(name)}-Therapist.svg`
    return `${ASSETS.team}/${fileName}`
  }

  const therapistName = data.assignedTherapist

  return (
    <div className="page3">
      <div className="page-inner page3-inner">

        <h1 className="p3-title">
          meet your
          <br />
          therapist
        </h1>

        <section className="p3-therapist">
          {/* ── REAL IMAGE (replaces placeholder) */}
          <div className="p3-portrait">
            <img
              src={getTherapistAvatar(therapistName)}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = avatarUrl(therapistName)
              }}
              alt={therapistName}
              className="p3-portrait-img"
            />
          </div>

          <div className="p3-therapist-copy">
            <div className="p3-therapist-name">
              {therapistName || '—'},
            </div>
            <div className="p3-therapist-role">
              {data.assignedTherapistDesignation || '-'}
            </div>
            <div className="p3-therapist-qual">
              {data.assignedTherapistQaulification || '-'}
            </div>
          </div>
        </section>

        <div className="p3-divider" />

        <section className="p3-community">
          <h2 className="p3-community-title">
            community
            <br />
            manager
          </h2>

          <div className="p3-community-name">
            {data.assignedCommManager || '—'}
          </div>

          <div className="p3-community-role">
            community manager
          </div>

          <p className="p3-community-note">
            your primary point-of-contact
            <br />
            for any assistance with your
            <br />
            therapy needs.
          </p>
        </section>

        <img src={logoSmall} alt="" className="p3-bottom-logo" />
      </div>
    </div>
  )
}