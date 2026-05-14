import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../public/images/logo.jpg');
const DST_DARK = path.resolve(__dirname, '../public/images/logo.png');
const DST_LIGHT = path.resolve(__dirname, '../public/images/logo-white.png');

const THRESHOLD = 245;
const SOFT_EDGE = 215;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

const buildVariant = (invert) => {
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;

    let alpha;
    if (luma >= THRESHOLD) {
      alpha = 0;
    } else if (luma >= SOFT_EDGE) {
      const t = (luma - SOFT_EDGE) / (THRESHOLD - SOFT_EDGE);
      alpha = Math.round((1 - t) * 255);
    } else {
      alpha = 255;
    }

    const colorValue = invert ? 255 : 0;
    out[i] = colorValue;
    out[i + 1] = colorValue;
    out[i + 2] = colorValue;
    out[i + 3] = alpha;
  }
  return out;
};

await sharp(buildVariant(false), { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(DST_DARK);

await sharp(buildVariant(true), { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(DST_LIGHT);

console.log(`Wrote ${DST_DARK} and ${DST_LIGHT} (${width}×${height})`);
