// scripts/export-icons.js
const fs = require("fs").promises;
const path = require("path");

// Define SVG strings directly
const icons = {
  "icon.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#brandGradient)" />
    <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" fill="white" fill-opacity="0.9" />
    <path d="M280 192l48 48-48 48M232 288l-48-48 48-48" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`,

  "maskable-icon.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="maskableGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#maskableGradient)" />
    <g transform="translate(102.4, 102.4) scale(0.6)">
      <circle cx="256" cy="256" r="256" fill="white" fill-opacity="0.1" />
      <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" fill="white" fill-opacity="0.9" />
      <path d="M280 192l48 48-48 48M232 288l-48-48 48-48" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>`,

  "icons/convert.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="convertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#convertGradient)" />
    <path d="M176 144h160a32 32 0 0132 32v160a32 32 0 01-32 32H176a32 32 0 01-32-32V176a32 32 0 0132-32z" stroke="white" stroke-width="16" fill="none" />
    <path d="M208 256h96M256 208v96" stroke="white" stroke-width="16" stroke-linecap="round" />
  </svg>`,

  "icons/send.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="sendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#sendGradient)" />
    <path d="M448 256L128 128l48 128-48 128z" fill="white" fill-opacity="0.9" />
    <path d="M176 256h192" stroke="white" stroke-width="24" stroke-linecap="round" />
  </svg>`,

  "icons/wallet.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
    <defs>
      <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#walletGradient)" />
    <path d="M144 192h224a32 32 0 0132 32v64a32 32 0 01-32 32H144a32 32 0 01-32-32v-64a32 32 0 0132-32z" stroke="white" stroke-width="16" fill="none" />
    <circle cx="320" cy="256" r="16" fill="white" />
  </svg>`,

  'og-image.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" fill="none">
    <defs>
      <linearGradient id="ogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
      <!-- Soft glow effect -->
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="#0B0F1C" />
    <path 
      d="M0 0L1200 0L1200 630L0 630Z" 
      fill="url(#ogGradient)" 
      fill-opacity="0.1"
    />
    
    <!-- Currency Exchange Icon -->
    <g transform="translate(100, 165) scale(0.6)">
      <circle cx="256" cy="256" r="256" fill="url(#ogGradient)" filter="url(#glow)" />
      <path 
        d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" 
        fill="white" 
        fill-opacity="0.9" 
      />
      <path 
        d="M280 192l48 48-48 48M232 288l-48-48 48-48" 
        stroke="white" 
        stroke-width="24" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
      />
    </g>
    
    <!-- Text Content -->
    <g transform="translate(420, 0)">
      <!-- Company Name -->
      <text 
        x="0" 
        y="280" 
        fill="white" 
        font-family="Inter, system-ui, sans-serif" 
        font-size="72" 
        font-weight="bold" 
        letter-spacing="-0.02em"
      >
        AbujaBureauDeChange
      </text>
      
      <!-- Tagline -->
      <text 
        x="0" 
        y="340" 
        fill="white" 
        fill-opacity="0.8" 
        font-family="Inter, system-ui, sans-serif" 
        font-size="32"
      >
        Fast & Secure Currency Exchange
      </text>
      
      <!-- Features -->
      <g fill="white" fill-opacity="0.6" font-family="Inter, system-ui, sans-serif" font-size="24">
        <text x="0" y="400">✓ Real-time Exchange Rates</text>
        <text x="0" y="440">✓ Secure Transactions</text>
        <text x="0" y="480">✓ Global Money Transfer</text>
      </g>
    </g>
  </svg>`,

  'twitter-card.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="418" fill="none">
    <defs>
      <linearGradient id="twitterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4F46E5" />
        <stop offset="100%" stop-color="#3730A3" />
      </linearGradient>
      <filter id="twitterGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="800" height="418" fill="#0B0F1C" />
    <path 
      d="M0 0L800 0L800 418L0 418Z" 
      fill="url(#twitterGradient)" 
      fill-opacity="0.1"
    />
    
    <!-- Icon -->
    <g transform="translate(50, 80) scale(0.4)">
      <circle cx="256" cy="256" r="256" fill="url(#twitterGradient)" filter="url(#twitterGlow)" />
      <path 
        d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" 
        fill="white" 
        fill-opacity="0.9" 
      />
      <path 
        d="M280 192l48 48-48 48M232 288l-48-48 48-48" 
        stroke="white" 
        stroke-width="24" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
      />
    </g>
    
    <!-- Text -->
    <g transform="translate(280, 0)">
      <text 
        x="0" 
        y="180" 
        fill="white" 
        font-family="Inter, system-ui, sans-serif" 
        font-size="48" 
        font-weight="bold" 
        letter-spacing="-0.02em"
      >
        AbujaBureauDeChange
      </text>
      
      <text 
        x="0" 
        y="240" 
        fill="white" 
        fill-opacity="0.8" 
        font-family="Inter, system-ui, sans-serif" 
        font-size="24"
      >
        Fast & Secure Currency Exchange
      </text>
      
      <text 
        x="0" 
        y="300" 
        fill="white" 
        fill-opacity="0.6" 
        font-family="Inter, system-ui, sans-serif" 
        font-size="20"
      >
        Real-time rates • Secure transfers • Global reach
      </text>
    </g>
  </svg>`
};


async function exportIcons() {
  try {
    for (const [filename, svgContent] of Object.entries(icons)) {
      const filepath = path.join(__dirname, "../public", filename);
      // Ensure directory exists
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      // Write SVG file
      await fs.writeFile(filepath, svgContent);
      console.log(`Created: ${filename}`);
    }
    console.log("All icons and images exported successfully!");
  } catch (error) {
    console.error("Error exporting files:", error);
  }
}

exportIcons();
