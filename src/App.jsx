import React, { useEffect, useRef } from 'react'
import { useQueryParams } from './hooks/useQueryParams'
import { FONTS } from './config/supabase'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'

export default function App() {
  const data = useQueryParams()
  const pagesRef = useRef(null)

  // ── Inject New Kansas @font-face dynamically from Supabase ──────
  useEffect(() => {
    const style = document.createElement('style')
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
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // ── PDF Download ─────────────────────────────────────────────────
  const handleDownload = async () => {
  const html2pdf = (await import('html2pdf.js')).default

  html2pdf()
    .set({
      margin: 0,
      filename: `treatment-plan-${data.customerName || 'draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 1,
        useCORS: true,
      },
      jsPDF: {
        unit: 'px',
        format: [1080, 1920],
        orientation: 'portrait',
      },
      pagebreak: {
        mode: ['css', 'legacy'],
      },
    })
    .from(pagesRef.current)
    .save()
}

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

    </div>
  )
}
