import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svg = readFileSync(path.join(root, 'app/icon.svg'));

const render = (size) =>
  sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

// PWA / Apple icons → public/
const targets = [
  { size: 180, out: 'app/apple-icon.png' },
  { size: 192, out: 'public/icon-192.png' },
  { size: 512, out: 'public/icon-512.png' },
];

for (const { size, out } of targets) {
  const buf = await render(size);
  writeFileSync(path.join(root, out), buf);
  console.log(`✓ ${out} (${size}×${size})`);
}

// Multi-size favicon.ico → app/ (Next serves it at /favicon.ico)
const ico = await pngToIco([await render(16), await render(32), await render(48)]);
writeFileSync(path.join(root, 'app/favicon.ico'), ico);
console.log('✓ app/favicon.ico (16/32/48)');
