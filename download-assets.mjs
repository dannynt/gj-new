import https from 'https';
import fs from 'fs';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  await download(
    'https://github.com/DavidHDev/react-bits/raw/main/src/content/Components/Lanyard/card.glb',
    'public/card.glb'
  );
  console.log('card.glb downloaded');

  await download(
    'https://github.com/DavidHDev/react-bits/raw/main/src/content/Components/Lanyard/lanyard.png',
    'public/lanyard.png'
  );
  console.log('lanyard.png downloaded');
}

main().catch(console.error);
