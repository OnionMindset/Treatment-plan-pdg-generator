import React from "react";
import { ASSETS } from "../config/supabase";
import "./Page2.css";
import logoBig from '../images/Logo/logoBig.svg'

export default function Page2({ data }) {
  // ── Fallback avatar (initials)
  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=6b1212&color=f5f0e8&size=144&rounded=true`;

  // ── Format name → "Dr Samarth" → "DrSamarth"
  const formatName = (name) =>
    name.trim().replace(/\s+/g, "").replace(/\./g, "");

  // ── Supabase avatar URL
  const getTherapistAvatar = (name) => {
    const fileName = `${formatName(name)}-Avatar.svg`;
    const url = `${ASSETS.team}/${fileName}`;

    console.log("Generated URL:", name, "→", url);

    return url;
  };

  return (
    <div className="page2">
      {/* Background logo */}
      <img src={logoBig} alt="" className="bg-logo" />

      {/* Title */}
      <h1 className="p2-title">
        your personalised
        <br />
        treatment plan
      </h1>

      {/* Subtext */}
      <div className="p2-sub">Treatment Plan Created By:</div>

      {/* Avatar list */}
      <div className="p2-names count-${data.planCreatedBy.length}">
        {data.planCreatedBy.map((person, i) => (
          <div className="p2-avatar" key={i}>
            <img
              src={getTherapistAvatar(person)}
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = avatarUrl(person);
              }}
              alt={person}
              className="p2-avatar-img"
            />

            <div className="p2-avatar-name">{person}</div>

            <div className="p2-avatar-role">
              {data.planCreatedByDesignation?.[i] || "Therapist"}
            </div>
          </div>
        ))}
      </div>

      {/* Plan */}
      <div
        className="p2-plan"
        dangerouslySetInnerHTML={{ __html: data.planDetails }}
      />
    </div>
  );
}
