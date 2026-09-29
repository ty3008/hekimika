import sharp from 'sharp';
import { statSync, existsSync, renameSync, unlinkSync, mkdirSync } from 'fs';
import { join } from 'path';

const ASSETS = './src/assets';
const CAROUSEL = './public/assets/home-carousel';

const targets = [
  // Hero / leader photos - max 380KB
  [join(ASSETS,'The Mulatis.webp'), 380, 1200],
  [join(ASSETS,'Pst Kevin and Lilian.webp'), 380, 1200],
  // WM event photos - max 220KB
  [join(ASSETS,'WM2.webp'), 220, 1000],
  [join(ASSETS,'WM3.webp'), 220, 1000],
  [join(ASSETS,'WM4.webp'), 220, 1000],
  [join(ASSETS,'WM6.webp'), 220, 1000],
  [join(ASSETS,'WM1.webp'), 180, 1000],
  [join(ASSETS,'WM5.webp'), 80, 800],
  // Dekut event photos - max 180KB
  [join(ASSETS,'Dekut 1.webp'), 180, 900],
  [join(ASSETS,'Dekut 2.webp'), 180, 900],
  [join(ASSETS,'Dekut 3.webp'), 180, 900],
  [join(ASSETS,'Dekut 4.webp'), 180, 900],
  // Egerton event photos - max 130KB
  [join(ASSETS,'Egerton 1.webp'), 130, 800],
  [join(ASSETS,'Egerton 2.webp'), 130, 800],
  [join(ASSETS,'Egerton 3.webp'), 130, 800],
  [join(ASSETS,'Egerton 4.webp'), 130, 800],
  // Book covers - max 100KB
  [join(ASSETS,'book- passion.webp'), 100, 600],
  [join(ASSETS,'book- choosing well.webp'), 100, 600],
  [join(ASSETS,'book- creating a solid form.webp'), 100, 600],
  [join(ASSETS,'book- dealing with ended relationships.webp'), 100, 600],
  [join(ASSETS,'book- praying for a solid man.webp'), 100, 600],
  [join(ASSETS,'The Pure Man.webp'), 120, 600],
  [join(ASSETS,'ESTABLISHING A SOLID CORE.webp'), 100, 600],
  [join(ASSETS,'Choosing Well.webp'), 80, 600],
  // Program images - max 120KB
  [join(ASSETS,'Work it out.webp'), 120, 800],
  [join(ASSETS,'Preparing for Love(1).webp'), 120, 800],
  [join(ASSETS,'Leadership.webp'), 120, 800],
  [join(ASSETS,'single and built pic.webp'), 90, 700],
  [join(ASSETS,'beginning right.webp'), 80, 700],
  [join(ASSETS,'Built to Lead.webp'), 80, 700],
  [join(ASSETS,'Life Couching - Singles.webp'), 80, 700],
  [join(ASSETS,'Life Changing - Singles.webp'), 80, 700],
  [join(ASSETS,'Life Coaching- Couples.webp'), 80, 700],
  [join(ASSETS,'Purity Basics.webp'), 80, 700],
  [join(ASSETS,'Coupled and Built.webp'), 75, 700],
  [join(ASSETS,'School of Healing.webp'), 75, 700],
  [join(ASSETS,'Keepers.webp'), 80, 700],
  // Carousel images - max 350KB
  [join(CAROUSEL,'carousel 1.webp'), 350, 1920],
  [join(CAROUSEL,'carousel 2.webp'), 350, 1920],
  [join(CAROUSEL,'carousel 3.webp'), 350, 1920],
  [join(CAROUSEL,'carousel 4.webp'), 350, 1920],
];

async function run() {
  let saved = 0;
  for (const [src, maxKB, w] of targets) {
    if (!existsSync(src)) { console.log(`SKIP (missing): ${src}`); continue; }
    const beforeKB = Math.round(statSync(src).size/1024);
    if (beforeKB <= maxKB) { console.log(`OK   ${beforeKB}KB <= ${maxKB}KB: ${src}`); continue; }
    const tmp = src + '.tmp.webp';
    try {
      await sharp(src).resize({width:w,withoutEnlargement:true}).webp({quality:77,effort:5}).toFile(tmp);
      const afterKB = Math.round(statSync(tmp).size/1024);
      if (afterKB < beforeKB) {
        renameSync(tmp, src);
        saved += beforeKB - afterKB;
        console.log(`DONE ${beforeKB}KB -> ${afterKB}KB  (${beforeKB-afterKB}KB saved): ${src}`);
      } else {
        unlinkSync(tmp);
        console.log(`SAME ${beforeKB}KB: ${src} (no improvement)`);
      }
    } catch(e) { console.error(`ERR  ${src}: ${e.message}`); if(existsSync(tmp)) unlinkSync(tmp); }
  }
  console.log(`\n=== TOTAL SAVED: ${saved}KB (${Math.round(saved/1024)}MB) ===`);
}

run();
