// scripts/convert-to-png.js
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

// Create simpler OG image SVG string with proper XML formatting
const ogImageSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#3730A3"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="#0B0F1C"/>
  <rect width="1200" height="630" fill="url(#ogGradient)" fill-opacity="0.1"/>
  
  <!-- Logo -->
  <g transform="translate(100, 165) scale(0.6)">
    <circle cx="256" cy="256" r="256" fill="url(#ogGradient)"/>
    <path d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm0 280c-66.3 0-120-53.7-120-120s53.7-120 120-120 120 53.7 120 120-53.7 120-120 120z" fill="white" fill-opacity="0.9"/>
    <path d="M280 192l48 48-48 48M232 288l-48-48 48-48" stroke="white" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  
  <!-- Text Content -->
  <text x="420" y="280" fill="white" font-family="system-ui, sans-serif" font-size="72" font-weight="bold">
    AbujaBureauDeChange
  </text>
  <text x="420" y="340" fill="white" fill-opacity="0.8" font-family="system-ui, sans-serif" font-size="32">
    Fast &amp; Secure Currency Exchange
  </text>
  <text x="420" y="400" fill="white" fill-opacity="0.6" font-family="system-ui, sans-serif" font-size="24">
    ✓ Real-time Exchange Rates
  </text>
  <text x="420" y="440" fill="white" fill-opacity="0.6" font-family="system-ui, sans-serif" font-size="24">
    ✓ Secure Transactions
  </text>
  <text x="420" y="480" fill="white" fill-opacity="0.6" font-family="system-ui, sans-serif" font-size="24">
    ✓ Global Money Transfer
  </text>
</svg>`;

async function generateImages() {
  try {
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, "../public/temp");
    await fs.mkdir(tempDir, { recursive: true });

    // Write temporary SVG file
    const svgPath = path.join(tempDir, "og-image.svg");
    await fs.writeFile(svgPath, ogImageSvg);

    // Convert to PNG
    await sharp(svgPath)
      .png()
      .toFile(path.join(__dirname, "../public/og-image.png"));

    // Clean up temp file
    await fs.unlink(svgPath);
    await fs.rmdir(tempDir);

    console.log("Successfully generated OG image!");
  } catch (error) {
    console.error("Error generating images:", error);
  }
}

generateImages();
