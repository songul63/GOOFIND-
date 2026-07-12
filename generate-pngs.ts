import sharp from 'sharp';
import * as fs from 'fs';

async function generatePngs() {
  console.log('Starting PNG generation from SVG...');

  const svgPath = 'goofind_icon.svg';
  if (!fs.existsSync(svgPath)) {
    console.error(`Error: ${svgPath} not found!`);
    return;
  }

  // 1. Generate AppIcon-512@2x.png (1024x1024, opaque for iOS App Icon)
  // Apple App Icons must NOT have alpha transparency. We will flatten it on a black background.
  try {
    const iosIconPath = 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png';
    console.log(`Generating: ${iosIconPath} (1024x1024, no alpha)...`);
    
    // Ensure directory exists
    const dir = 'ios/App/App/Assets.xcassets/AppIcon.appiconset';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await sharp(svgPath)
      .resize(1024, 1024)
      .flatten({ background: { r: 11, g: 15, b: 25 } }) // corporate blue slate background from SVG
      .png({ colorspace: 'srgb', quality: 100 })
      .toFile(iosIconPath);

    console.log(`Successfully generated ${iosIconPath}!`);
  } catch (err: any) {
    console.error('Error generating iOS AppIcon:', err.message);
  }

  // Helper to generate other standard 512x512 PNGs
  const pngsToGenerate = [
    'goofind_icon.png',
    'goofind_app_icon_512.png',
    'public/goofind_icon.png',
    'public/goofind_app_icon_512.png'
  ];

  for (const path of pngsToGenerate) {
    try {
      console.log(`Generating: ${path} (512x512)...`);
      await sharp(svgPath)
        .resize(512, 512)
        .png({ colorspace: 'srgb', quality: 100 })
        .toFile(path);
      console.log(`Successfully generated ${path}!`);
    } catch (err: any) {
      console.error(`Error generating ${path}:`, err.message);
    }
  }

  console.log('PNG generation complete!');
}

generatePngs();
