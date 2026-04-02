import React from "react";
import { ASSETS } from "../config/supabase";
import "./Page2.css";

export default function Page2({ data }) {
  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=6b1212&color=f5f0e8&size=144&rounded=true`;

  const formatName = (name) =>
    name.trim().replace(/\s+/g, "").replace(/\./g, "");

  const getTherapistAvatar = (name) => {
    const fileName = `${formatName(name)}-Avatar.svg`;
    return `${ASSETS.team}/${fileName}`;
  };

  const plan = data.planDetails ?? {}

  return (
    <div className="page2">
      {/* Background logo */}
      <img src={ASSETS.logoBig} alt="" className="bg-logo" />

      {/* Title */}
      <h1 className="p2-title">
        your personalised
        <br />
        treatment plan
      </h1>

      {/* Subtext */}
      <div className="p2-sub">Treatment Plan Created By:</div>

      {/* Avatar list */}
      <div className={`p2-names count-${data.planCreatedBy.length}`}>
        {data.planCreatedBy.map((person, i) => (
          <div className="p2-avatar" key={i}>
            <img
              src={getTherapistAvatar(person)}
              onError={(e) => {
                e.target.onerror = null;
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

      {/* Plan Details */}
      <div className="p2-plan">

        {/* Session */}
        {plan.sessionFrequency && (
          <div className="p2-plan-row">
            <span className="p2-plan-label">Session Frequency</span>
            <span className="p2-plan-value">
              {plan.sessionFrequency} session(s) per {plan.sessionInterval || '—'}
            </span>
          </div>
        )}

        {/* Assessment */}
        {plan.assessmentPlan?.length > 0 && (
          <div className="p2-plan-row">
            <span className="p2-plan-label">Assessment Plan</span>
            <span className="p2-plan-value">{plan.assessmentPlan.join(', ')}</span>
          </div>
        )}

        {/* Psychiatry */}
        {plan.psychiatryPlan && (
          <>
            <div className="p2-plan-row">
              <span className="p2-plan-label">Psychiatry Plan</span>
              <span className="p2-plan-value">{plan.psychiatryPlan}</span>
            </div>
            <div className="p2-plan-row">
              <span className="p2-plan-label">Psychiatry Frequency</span>
              <span className="p2-plan-value">
                {plan.psychiatryFrequency} session(s) per {plan.psychiatryInterval || '—'}
              </span>
            </div>
            {plan.psychiatrist && (
              <div className="p2-plan-row">
                <span className="p2-plan-label">Psychiatrist</span>
                <span className="p2-plan-value">{plan.psychiatrist}</span>
              </div>
            )}
          </>
        )}

        {/* Nutrition */}
        {plan.nutritionist && (
          <div className="p2-plan-row">
            <span className="p2-plan-label">Nutritionist</span>
            <span className="p2-plan-value">{plan.nutritionist}</span>
          </div>
        )}

      </div>
    </div>
  );
}