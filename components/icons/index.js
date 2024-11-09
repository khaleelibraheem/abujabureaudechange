// components/icons/index.js

export const AppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    {/* Base Circle */}
    <circle cx="256" cy="256" r="256" fill="url(#brandGradient)" />
    {/* Currency Exchange Symbol */}
    <path
      d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z"
      fill="white"
      fillOpacity="0.9"
    />
    {/* Exchange Arrows */}
    <path
      d="M280 192l48 48-48 48M232 288l-48-48 48-48"
      stroke="white"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ConvertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="convertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#convertGradient)" />
    {/* Calculator/Convert Symbol */}
    <path
      d="M176 144h160a32 32 0 0132 32v160a32 32 0 01-32 32H176a32 32 0 01-32-32V176a32 32 0 0132-32z"
      stroke="white"
      strokeWidth="16"
      fill="none"
    />
    <path
      d="M208 256h96M256 208v96"
      stroke="white"
      strokeWidth="16"
      strokeLinecap="round"
    />
  </svg>
);

export const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#sendGradient)" />
    {/* Paper Plane Symbol */}
    <path d="M448 256L128 128l48 128-48 128z" fill="white" fillOpacity="0.9" />
    <path
      d="M176 256h192"
      stroke="white"
      strokeWidth="24"
      strokeLinecap="round"
    />
  </svg>
);

export const ReceiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="receiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#receiveGradient)" />
    {/* Download/Receive Symbol */}
    <path
      d="M256 160v192M176 288l80 64 80-64"
      stroke="white"
      strokeWidth="24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#walletGradient)" />
    {/* Wallet Symbol */}
    <path
      d="M144 192h224a32 32 0 0132 32v64a32 32 0 01-32 32H144a32 32 0 01-32-32v-64a32 32 0 0132-32z"
      stroke="white"
      strokeWidth="16"
      fill="none"
    />
    <circle cx="320" cy="256" r="16" fill="white" />
  </svg>
);

export const MaskableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="maskableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#maskableGradient)" />
    {/* Safe Area Content (centered in middle 60%) */}
    <g transform="translate(102.4, 102.4) scale(0.6)">
      <circle cx="256" cy="256" r="256" fill="white" fillOpacity="0.1" />
      <path
        d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M280 192l48 48-48 48M232 288l-48-48 48-48"
        stroke="white"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
