<svg viewBox="0 0 600 400" class="w-full rounded bg-gray-800 p-4" role="img">
  <title>ITD and ILD from sound source position</title>
  <defs>
    <marker
      id="arrowhead"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
    </marker>
  </defs>

  <circle cx="300" cy="200" r="60" fill="#374151" stroke="#60a5fa" stroke-width="2" />

  <ellipse
    cx="250"
    cy="200"
    rx="15"
    ry="25"
    fill="#4b5563"
    stroke="#60a5fa"
    stroke-width="1"
  />
  <ellipse
    cx="350"
    cy="200"
    rx="15"
    ry="25"
    fill="#4b5563"
    stroke="#60a5fa"
    stroke-width="1"
  />
  <text x="250" y="205" text-anchor="middle" fill="#93c5fd" font-size="12">L</text>
  <text x="350" y="205" text-anchor="middle" fill="#93c5fd" font-size="12">R</text>

  <circle cx="150" cy="150" r="20" fill="#3b82f6" opacity="0.8" />
  <text x="150" y="155" text-anchor="middle" fill="white" font-size="14">🔊</text>

  <path
    d="M 170 150 Q 210 170 250 190"
    stroke="#60a5fa"
    stroke-width="2"
    fill="none"
    stroke-dasharray="5,5"
    marker-end="url(#arrowhead)"
  />
  <path
    d="M 170 150 Q 240 140 340 185"
    stroke="#a78bfa"
    stroke-width="2"
    fill="none"
    stroke-dasharray="5,5"
    marker-end="url(#arrowhead)"
  />

  <text x="200" y="170" fill="#60a5fa" font-size="12">Shorter path</text>
  <text x="240" y="125" fill="#a78bfa" font-size="12">Longer path</text>
  <text x="380" y="180" fill="#a78bfa" font-size="11">(arrives later,</text>
  <text x="380" y="195" fill="#a78bfa" font-size="11">quieter)</text>

  <path
    d="M 300 200 L 300 120"
    stroke="#86efac"
    stroke-width="1"
    stroke-dasharray="3,3"
  />
  <path
    d="M 300 200 L 150 150"
    stroke="#86efac"
    stroke-width="1"
    stroke-dasharray="3,3"
  />
  <path
    d="M 300 160 A 40 40 0 0 1 265 135"
    stroke="#86efac"
    stroke-width="2"
    fill="none"
  />
  <text x="270" y="150" fill="#86efac" font-size="12">azimuth</text>

  <text x="450" y="120" fill="#fbbf24" font-size="12">Elevation (up/down)</text>
  <line
    x1="460"
    y1="130"
    x2="460"
    y2="270"
    stroke="#fbbf24"
    stroke-width="2"
    marker-end="url(#arrowhead)"
  />
  <text x="470" y="150" fill="#fbbf24" font-size="11">+90°</text>
  <text x="470" y="200" fill="#fbbf24" font-size="11">0°</text>
  <text x="470" y="265" fill="#fbbf24" font-size="11">-90°</text>

  <text
    x="300"
    y="30"
    text-anchor="middle"
    fill="#93c5fd"
    font-size="18"
    font-weight="bold"
  >
    ITD and ILD from Sound Source Position
  </text>
</svg>
