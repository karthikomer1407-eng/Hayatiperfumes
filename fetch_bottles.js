import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const bottles = [
  { name: 'original_gissah_akoya.webp', url: 'https://perfumes600.com/cdn/shop/files/Akoya_285b1de8-91be-434a-b0b0-7d50f40f3f93.webp' },
  { name: 'original_ahmed_marj.jpg', url: 'https://ahmedalmaghribi.co.in/cdn/shop/files/marj-1.jpg' },
  { name: 'original_summer_oud.jpg', url: 'https://ahmedalmaghribi.co.in/cdn/shop/files/summer-oud-1.jpg' },
  { name: 'original_hawas_ice.jpg', url: 'https://rasasistore.com/cdn/shop/files/Hawas_Ice_1.jpg' },
  { name: 'original_xerjoff_erba_pura.png', url: 'https://www.xerjoff.com/cdn/shop/files/gallery-xerjoff-erbapura-eau-de-parfum-50ml.png' },
  { name: 'original_jpg_scandal.png', url: 'https://medias.jeanpaulgaultier.com/cdn-cgi/image/width=600/medias/sys_master/images/h7c/h46/10667499618334/10667499552798/10667499552798.png' },
  { name: 'original_tf_tobacco_vanille.png', url: 'https://scentira.in/cdn/shop/files/TOM_FORD_TOBACCO_VANILLE_1_3220b3a6-59ac-448b-aacd-1d32ddb164fd.png?v=1756889509&width=1000' },
  { name: 'original_blue_oud_ibraq.png', url: 'https://scentira.in/cdn/shop/files/IbrahEEm_Al_Qurashi_BLUE_OUD_1_a6770257-d748-4e9b-afb5-f143c34419e9.png?v=1756889191&width=1000' },
  { name: 'original_rasheeqa.webp', url: 'https://uae.swissarabian.com/cdn/shop/files/Top-angle_d2cf4f0c-ab25-490e-8aaa-abe4f767cdc4.webp' },
  { name: 'original_invictus_intense.png', url: 'https://www.perfumenetwork.in/cdn/shop/products/PacoRabanneInvictusIntenseEaudeToilette100ml.png?v=1629444147' }
];

const destDir = path.join(process.cwd(), 'public', 'assets', 'images');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return resolve(`Status ${res.statusCode}`);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve('OK'));
      });
    });
    req.on('error', (err) => resolve(`Err: ${err.message}`));
  });
}

async function run() {
  for (const b of bottles) {
    const file = path.join(destDir, b.name);
    console.log(`Downloading ${b.name}...`);
    const res = await download(b.url, file);
    console.log(`Result ${b.name}: ${res}`);
  }
}

run();
