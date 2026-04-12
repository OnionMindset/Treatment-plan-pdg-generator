import React from "react";
import { ASSETS } from "../config/supabase";
import "./Page2.css";

export default function Page2({ data }) {
  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "",
    )}&background=6b1212&color=f5f0e8&size=144&rounded=true`;

  const formatName = (name) =>
    (name || "").trim().replace(/\s+/g, "").replace(/\./g, "");

  const getTherapistAvatar = (name) => {
    const key = (name || "").trim().replace(/\./g, "").replace(/\s+/g, "");
    return ASSETS.team[key]?.avatar || avatarUrl(name);
  };

  const formatSession = (n) => {
    const num = Number(n);
    return num === 1 ? "1 session" : `${num} sessions`;
  };

  const formatDesignation = (value = "") =>
    value
      .toString()
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase());

  const formatList = (arr = []) => arr.join(", ");

  const plan = data.planDetails ?? {};

  return (
    <div className="page2">
      {/* Background logo */}
      <img src={ASSETS.logoBig} alt="" className="bg-logo" loading="lazy" />

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
              loading="lazy"
            />
            <div className="p2-avatar-name">{person}</div>
            <div className="p2-avatar-role">
              {formatDesignation(
                data.planCreatedByDesignation?.[i] || "Therapist",
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plan Details */}
      <div className="p2-plan">
        <p className="p2-paragraph-title">For the next 30 days:</p>
        <ul className="p2-list">
          {/* ── Frequency ───────────────── */}
          {plan.sessionFrequency && (
            <li className="p2-paragraph">
              Therapeutic intervention with a session frequency of{" "}
              <strong>{formatSession(plan.sessionFrequency)}</strong> every{" "}
              <strong>{plan.sessionInterval || "—"}</strong>. If you feel the
              need, or if your therapist recommends it, we may increase the
              frequency to give you additional support. Any ad-hoc session will
              not come at an additional cost and is a part of the treatment
              plan.
            </li>
          )}

          {/* ── Psychometric Assessment ───────── */}
          {plan.assessmentPlan?.length > 0 ? (
            <li className="p2-paragraph">
              We are considering{" "}
              <strong>{formatList(plan.assessmentPlan)}</strong> — psychometric
              assessments during the course of your therapy. This is also a part
              of your treatment plan and doesn't come at an additional cost.
            </li>
          ) : (
            <li className="p2-paragraph">
              We may or may not consider a psychometric assessment after 2
              weeks.
            </li>
          )}

          {/* ── Psychiatry ───────────────── */}
          {plan.psychiatryPlan ? (
            <li className="p2-paragraph">
              We are also recommending psychiatric consultations{" "}
              {plan.psychiatrist && (
                <>
                  with <strong>{plan.psychiatrist}</strong>{" "}
                </>
              )}
              with a session frequency of{" "}
              <strong>{formatSession(plan.psychiatryFrequency)}</strong> every{" "}
              <strong>{plan.psychiatryInterval || "—"}</strong>.
            </li>
          ) : (
            <li className="p2-paragraph">
              We do not see the need for any psychiatric intervention at this
              stage.
            </li>
          )}

          {/* ── Nutritionist ─────────────── */}
          {plan.nutritionist && (
            <li className="p2-paragraph">
              We also believe consulting our nutritionist{" "}
              {plan.nutritionistName && (
                <>
                  <strong>{plan.nutritionistName}</strong>{" "}
                </>
              )}
              will be beneficial for your therapy process with us.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
