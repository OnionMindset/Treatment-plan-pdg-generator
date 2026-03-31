import './Page1.css'
import cover from '../images/cover.svg'
import logo from '../images/Logo/glassOnionLogoWithName.svg'

export default function Page1({ data }) {
  return (
    
    <div className="page1">

      {/* Top */}
      <div className="top">

        <div className="logo-wrap">
            <img
              src={logo}
              alt="logo"
              className="logo"
            />
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
          <img
            src={cover}
            alt="cover"
            className="cover"
          />
        <div className="tagline">
          your mind, reimagined.
        </div>
      </div>

    </div>
  )
}