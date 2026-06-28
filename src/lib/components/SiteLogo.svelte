<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  class="h-8 w-8"
  aria-hidden="true"
>
  <defs>
    <clipPath id="il-mark-tile">
      <rect x="6" y="6" width="88" height="88" rx="24" />
    </clipPath>
  </defs>

  <!-- Dark tile -->
  <rect x="6" y="6" width="88" height="88" rx="24" fill="#0b0e14" />

  <!-- Three wavelets filled between curve pairs, screen-blended so overlaps
       combine into brighter secondary colors -->
  <g clip-path="url(#il-mark-tile)" style="mix-blend-mode: screen">
    <path
      d="M2 50 C 20 24, 40 24, 50 50 C 60 76, 80 76, 98 50 C 94 64, 88 64, 83 50 C 76 30, 64 30, 58 50 C 52 72, 40 72, 33 50 C 26 28, 14 28, 2 50 Z"
      fill="#e22a9e"
      fill-opacity="0.72"
    />
    <path
      d="M2 50 C 14 28, 26 28, 33 50 C 40 72, 52 72, 58 50 C 64 30, 76 30, 83 50 C 88 64, 94 64, 98 50 C 94 42, 88 42, 84 50 C 78 64, 70 64, 64 50 C 58 36, 50 36, 44 50 C 38 64, 30 64, 24 50 C 18 36, 10 36, 2 50 Z"
      fill="#e8801c"
      fill-opacity="0.72"
    />
    <path
      d="M2 50 C 10 36, 18 36, 24 50 C 30 64, 38 64, 44 50 C 50 36, 58 36, 64 50 C 70 64, 78 64, 84 50 C 88 42, 94 42, 98 50 C 80 76, 60 76, 50 50 C 40 24, 20 24, 2 50 Z"
      fill="#00a6c8"
      fill-opacity="0.72"
    />

    <g fill="none" stroke-width="3.2" stroke-linecap="round">
      <path d="M2 50 C 20 24, 40 24, 50 50 C 60 76, 80 76, 98 50" stroke="#ff5cc0" />
      <path
        d="M2 50 C 14 28, 26 28, 33 50 C 40 72, 52 72, 58 50 C 64 30, 76 30, 83 50 C 88 64, 94 64, 98 50"
        stroke="#ffa53e"
      />
      <path
        d="M2 50 C 10 36, 18 36, 24 50 C 30 64, 38 64, 44 50 C 50 36, 58 36, 64 50 C 70 64, 78 64, 84 50 C 88 42, 94 42, 98 50"
        stroke="#2bcfee"
      />
    </g>
  </g>
</svg>
