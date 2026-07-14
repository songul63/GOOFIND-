import { execSync, spawn } from 'child_process';
import os from 'os';

const port = 4173;

function portInUse(p) {
  try {
    return execSync(`lsof -ti :${p}`, { encoding: 'utf8' }).trim().length > 0;
  } catch {
    return false;
  }
}

function getLanIp() {
  try {
    for (const entries of Object.values(os.networkInterfaces())) {
      for (const net of entries ?? []) {
        if (net.family === 'IPv4' && !net.internal) return net.address;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

if (!portInUse(port)) {
  console.error('');
  console.error(`❌ Port ${port} boş. Önce çalıştırın:`);
  console.error('   npm run phone');
  console.error('');
  process.exit(1);
}

try {
  const code = execSync(`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:${port}/`, {
    encoding: 'utf8',
  }).trim();
  if (code !== '200') {
    console.error(`❌ Sunucu yanıt vermiyor (HTTP ${code}). npm run phone:stop && npm run phone`);
    process.exit(1);
  }
} catch {
  console.error('❌ localhost:4173 erişilemiyor');
  process.exit(1);
}

const ip = getLanIp();
console.log('');
console.log(`✅ Sunucu hazır (port ${port})`);
if (ip) console.log(`   Yerel Wi-Fi: http://${ip}:${port}`);
console.log('');
console.log('🌐 Cloudflare tüneli açılıyor… (bu pencereyi KAPATMAYIN)');
console.log('   Telefonda çıkan https://....trycloudflare.com linkini Safari’de açın.');
console.log('   IP doğrulama sayfası YOK — doğrudan uygulama açılır.');
console.log('');

const child = spawn(
  'npx',
  ['--yes', 'cloudflared', 'tunnel', '--url', `http://127.0.0.1:${port}`, '--no-autoupdate'],
  { stdio: 'inherit', shell: false },
);

child.on('exit', (code) => process.exit(code ?? 0));
