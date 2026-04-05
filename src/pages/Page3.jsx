import React from "react";
import { ASSETS } from "../config/supabase";
import "./Page3.css";

// ── Pure helpers (module-level, not recreated on every render) ──────────────

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "")}&background=6b1212&color=f5f0e8&size=200&rounded=true`;

const formatName = (name) =>
  (name || "").trim().replace(/\./g, "").replace(/\s+/g, "");

const getTherapistAvatar = (name) =>
  name ? `${ASSETS.team}/${formatName(name)}-Therapist.svg` : "";

const formatDesignation = (value = "") =>
  value.toString().trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

// ── Sub-component: removes duplicated avatar + fallback pattern ─────────────

function TeamAvatar({ name }) {
  return (
    <div className="p3-portrait">
      <img
        src={getTherapistAvatar(name)}
        onError={(e) => { e.target.onerror = null; e.target.src = avatarUrl(name); }}
        alt={name}
        className="p3-portrait-img"
        loading="lazy"
      />
    </div>
  );
}

// ── Pure selector: replaces mutating if/else block ──────────────────────────

function getSupport(plan, data) {
  if (plan.psychiatryPlan) {
    return {
      title: "psychiatrist support",
      name: data.assignedPsychiatrist || "—",
      role: formatDesignation(data.assignedPsychiatristDesignation || "Psychiatrist"),
      note: data.assignedPsychiatristQualification || "",
    };
  }
  if (plan.nutritionist) {
    return {
      title: "nutritionist support",
      name: data.assignedNutritionist || "—",
      role: formatDesignation(data.assignedNutritionistDesignation || "Nutritionist"),
      note: data.assignedNutritionistQualification || "",
    };
  }
  return {
    title: "community manager",
    name: data.assignedCommManager || "—",
    role: "Community Manager",
    note: "your primary point-of-contact for any assistance with your therapy needs.",
  };
}

// ── Component ───────────────────────────────────────────────────────────────

export default function Page3({ data }) {
  const plan = data.planDetails ?? {};
  const hasCoProvider = !!(plan.psychiatryPlan || plan.nutritionist);
  const support = getSupport(plan, data);

  const therapist = {
    name: data.assignedTherapist || "—",
    designation: data.assignedTherapistDesignation || "—",
    qualification: data.assignedTherapistQualification || "—",
  };

  return (
    <div className="page3">
      <div className="page-inner page3-inner">
        <h1 className="p3-title">
          meet your<br />
          {hasCoProvider ? "therapists" : "therapist"}
        </h1>

        {/* ── Therapist ── */}
        <section className="p3-therapist">
          <TeamAvatar name={therapist.name} />
          <div className="p3-therapist-copy">
            <div className="p3-therapist-name">{therapist.name}</div>
            <div className="p3-therapist-role">{formatDesignation(therapist.designation)}</div>
            <div className="p3-therapist-qual">{therapist.qualification}</div>
          </div>
        </section>

        <div className="p3-divider" />

        {/* ── Support ── */}
        {hasCoProvider ? (
          <section className="p3-support">
            <div className="p3-therapist">
              <TeamAvatar name={support.name} />
              <div className="p3-therapist-copy">
                <div className="p3-therapist-name">{support.name}</div>
                <div className="p3-therapist-role">{support.role}</div>
                {support.note && <div className="p3-therapist-qual">{support.note}</div>}
              </div>
            </div>
          </section>
        ) : (
          <section className="p3-community">
            <h2 className="p3-community-title">
              {support.title.split(" ").map((word, i, arr) => (
                <React.Fragment key={i}>{word}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <div className="p3-community-name">{support.name}</div>
            <div className="p3-community-role">{support.role}</div>
            {support.note && <p className="p3-community-note">{support.note}</p>}
          </section>
        )}

        <img src={ASSETS.logoSmall} alt="" className="p3-bottom-logo" loading="lazy"/>
      </div>
    </div>
  );
}