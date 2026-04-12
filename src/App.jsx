import React, { useEffect, useRef } from "react";
import { useQueryParams } from "./hooks/useQueryParams";
import { FONTS, ASSETS, preloadAllAssets } from "./config/supabase";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";

export default function App() {
  const data = useQueryParams();
  const pagesRef = useRef(null);

  // ── Inject New Kansas @font-face dynamically from Supabase ──────
  useEffect(() => {
    preloadAllAssets();
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.thin}') format('woff2');
        font-weight: 100;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.light}') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.regular}') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.medium}') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.semibold}') format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.bold}') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.heavy}') format('woff2');
        font-weight: 800;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'New Kansas';
        src: url('${FONTS.black}') format('woff2');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ── PDF Download ─────────────────────────────────────────────────
  const handleDownload = async () => {
    console.log("1. starting");
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);
    console.log("2. libraries loaded");

    const pages = pagesRef.current.querySelectorAll(
      ".page1, .page2, .page3, .Page4, .page5",
    );
    console.log("3. pages found:", pages.length);

    const images = pagesRef.current.querySelectorAll("img");
    console.log("4. images:", images.length);
    [...images].forEach((img, i) => {
      console.log(
        `img ${i}:`,
        img.src,
        "complete:",
        img.complete,
        "naturalWidth:",
        img.naturalWidth,
      );
    });
    console.log("5. images ready");

    const pdf = new jsPDF({
      unit: "px",
      format: [1080, 1920],
      orientation: "portrait",
      hotfixes: ["px_scaling"],
    });
    console.log("6. pdf created");

    for (let i = 0; i < pages.length; i++) {
      console.log(`7. rendering page ${i + 1}`);
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 15000,
        windowWidth: 1080,
        width: 1080,
        height: 1920,
      });
      console.log(`8. page ${i + 1} canvas done`);
      if (i > 0) pdf.addPage([1080, 1920], "portrait");
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.92),
        "JPEG",
        0,
        0,
        1080,
        1920,
      );
      console.log(`9. page ${i + 1} added to pdf`);
    }

    console.log("10. saving...");
    pdf.save(`${data.customerName || "draft"}_Treatment Plan_Glass Onion Therapy.pdf`);
    console.log("11. done");
  };

  return (
    <div className="app">
      <button className="download-btn" onClick={handleDownload}>
        ⬇ Download PDF
      </button>

      {/* All pages — stacked vertically, exported together as PDF */}
      <div className="pages-wrapper" ref={pagesRef}>
        <Page1 data={data} />
        <Page2 data={data} />
        <Page3 data={data} />
        <Page4 data={data} />
        <Page5 data={data} />
      </div>

      <button className="download-btn" onClick={handleDownload}>
        ⬇ Download PDF
      </button>
    </div>
  );
}
