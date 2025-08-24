export function DeficiencyDetectLogo() {
  return (
    <div className="flex justify-center">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Magnifying Glass Circle */}
        <circle cx="45" cy="45" r="35" stroke="#1e3a3a" strokeWidth="4" fill="white" opacity="0.9" />

        {/* Magnifying Glass Handle */}
        <line x1="72" y1="72" x2="95" y2="95" stroke="#1e3a3a" strokeWidth="4" strokeLinecap="round" />

        {/* Eye Icon inside magnifying glass */}
        <g transform="translate(35, 35)">
          <ellipse cx="10" cy="10" rx="8" ry="5" fill="#4a7c7c" opacity="0.8" />
          <circle cx="10" cy="10" r="3" fill="#1e3a3a" />
          <circle cx="11" cy="9" r="1" fill="white" />
        </g>

        {/* Fingernail Icon */}
        <g transform="translate(50, 30)">
          <ellipse cx="5" cy="8" rx="4" ry="6" fill="#6b9999" opacity="0.7" />
          <ellipse cx="5" cy="6" rx="3" ry="2" fill="white" opacity="0.8" />
        </g>

        {/* Tongue Icon */}
        <g transform="translate(28, 50)">
          <ellipse cx="8" cy="5" rx="6" ry="4" fill="#d4a574" opacity="0.7" />
          <ellipse cx="8" cy="4" rx="4" ry="2" fill="#e8b892" opacity="0.8" />
        </g>

        {/* Subtle connecting dots for cohesion */}
        <circle cx="42" cy="38" r="1.5" fill="#4a7c7c" opacity="0.4" />
        <circle cx="48" cy="52" r="1.5" fill="#4a7c7c" opacity="0.4" />
        <circle cx="38" cy="48" r="1.5" fill="#4a7c7c" opacity="0.4" />
      </svg>
    </div>
  )
}
