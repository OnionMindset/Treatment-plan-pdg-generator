import React from "react";
import "./Page4.css";

export default function Page4({ data }) {
  return (
    <div className="Page4">
      {/* Title */}
      <h1 className="p4-title">pricing</h1>

      {/* Subtitle */}
      <div className="p4-sub">for the next 30 days:</div>

      {/* Price */}
      <div className="p4-price">
        ₹{Number(data.pricing).toLocaleString("en-IN")}
      </div>

      {/* Section 1 */}
      <div className="p4-section">
        <div className="p4-chip">What does this include?</div>
        <ul>
          <li>
            <span className="p4-bullet">•</span>Weekly personalised therapy
            sessions for the next 30 days.
          </li>
          <li>
            <span className="p4-bullet">•</span>Access to our group therapy
            sessions.
          </li>
          <li>
            <span className="p4-bullet">•</span>Access to our community events.
          </li>
        </ul>
      </div>

      {/* Section 2 */}
      <div className="p4-section">
        <div className="p4-chip">What happens after 30 days?</div>
        <p>
          At the end of 30 days, we will review your progress together and
          collaboratively decide the best next steps.
        </p>
      </div>

      {/* Section 3 */}
      <div className="p4-section">
        <div className="p4-chip">What are the next steps?</div>
        <p>
          You can make the payment and start your therapy immediately. <br></br>
          For any doubts / queries, you can even contact your assigned community
          manager.
        </p>
      </div>
    </div>
  );
}
