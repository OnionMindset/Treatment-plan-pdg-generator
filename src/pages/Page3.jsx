import React from 'react'
import { ASSETS } from '../config/supabase'
import './Page3.css'

export default function Page3({ data }) {
  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || ''
    )}&background=6b1212&color=f5f0e8&size=200&rounded=true`

  const formatName = (name) =>
    (name || '').trim().replace(/\./g, '').replace(/\s+/g, '')

  const getTherapistAvatar = (name) => {
    if (!name) return ''
    const fileName = `${formatName(name)}-Therapist.svg`
    return `${ASSETS.team}/${fileName}`
  }

  const formatDesignation = (value = "") =>
    value
      .toString()
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase())

  const therapist = {
    name: data.assignedTherapist || '—',
    designation: data.assignedTherapistDesignation || '—',
    qualification: data.assignedTherapistQualification || '—',
  }

  const selectedSupport = data.selectedSupportType // 'community_manager' | 'psychiatrist' | 'nutritionist'

  const supportContent = {
    community_manager: {
      title: <>community<br />manager</>,
      name: data.assignedCommManager || '—',
      role: 'Community Manager',
      note: (
        <>
          your primary point-of-contact
          <br />
          for any assistance with your
          <br />
          therapy needs.
        </>
      ),
    },
    psychiatrist: {
      title: <>psychiatrist<br />support</>,
      name: data.assignedPsychiatrist || '—',
      role: formatDesignation(data.assignedPsychiatristDesignation || 'Psychiatrist'),
      note: data.assignedPsychiatristQualification || '',
    },
    nutritionist: {
      title: <>nutritionist<br />support</>,
      name: data.assignedNutritionist || '—',
      role: formatDesignation(data.assignedNutritionistDesignation || 'Nutritionist'),
      note: data.assignedNutritionistQualification || '',
    },
  }

  const support =
    supportContent[selectedSupport] || supportContent.community_manager

  return (
    <div className="page3">
      <div className="page-inner page3-inner">
        <h1 className="p3-title">
          meet your
          <br />
          therapist
        </h1>

        <section className="p3-therapist">
          <div className="p3-portrait">
            <img
              src={getTherapistAvatar(therapist.name)}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = avatarUrl(therapist.name)
              }}
              alt={therapist.name}
              className="p3-portrait-img"
            />
          </div>

          <div className="p3-therapist-copy">
            <div className="p3-therapist-name">{therapist.name}</div>
            <div className="p3-therapist-role">
              {formatDesignation(therapist.designation)}
            </div>
            <div className="p3-therapist-qual">{therapist.qualification}</div>
          </div>
        </section>

        <div className="p3-divider" />

        <section className="p3-community">
          <h2 className="p3-community-title">{support.title}</h2>

          <div className="p3-community-name">{support.name}</div>

          <div className="p3-community-role">{support.role}</div>

          {support.note ? (
            <p className="p3-community-note">{support.note}</p>
          ) : null}
        </section>

        <img src={ASSETS.logoSmall} alt="" className="p3-bottom-logo" />
      </div>
    </div>
  )
}