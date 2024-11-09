// scripts/generate-icons.js
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

// Base SVG icon
const baseIcon = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#3730A3"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#brandGradient)"/>
  <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" fill="white" fill-opacity="0.9"/>
  <path d="M280 192l48 48-48 48M232 288l-48-48 48-48" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Maskable version with safe area
const maskableIcon = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#3730A3"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#brandGradient)"/>
  <g transform="translate(128,128) scale(0.5)">
    <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" fill="white" fill-opacity="0.9"/>
    <path d="M280 192l48 48-48 48M232 288l-48-48 48-48" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

const iconSizes = [
  { size: 192, name: "icon-192x192.png" },
  { size: 512, name: "icon-512x512.png" },
  { size: 192, name: "maskable-192x192.png", maskable: true },
  { size: 512, name: "maskable-512x512.png", maskable: true },
  { size: 96, name: "convert-96x96.png" },
  { size: 96, name: "send-96x96.png" },
];

async function generateIcons() {
  try {
    // Create directories if they don't exist
    const publicDir = path.join(__dirname, "../public");
    const iconsDir = path.join(publicDir, "icons");
    await fs.mkdir(iconsDir, { recursive: true });

    // Save base SVG
    await fs.writeFile(path.join(publicDir, "icon.svg"), baseIcon);

    // Generate all PNG icons
    for (const icon of iconSizes) {
      const svg = icon.maskable ? maskableIcon : baseIcon;
      await sharp(Buffer.from(svg))
        .resize(icon.size, icon.size)
        .png()
        .toFile(path.join(iconsDir, icon.name));

      console.log(`Generated: ${icon.name}`);
    }

    console.log("All icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
