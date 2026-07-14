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
  console.error(`❌ Port ${port} boş — önce önizleme sunucusunu başlatın:`);
  console.error('   npm run phone');
  console.error('');
  process.exit(1);
}

try {
  const code = execSync(`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:${port}/`, {
    encoding: 'utf8',
  }).trim();
  if (code !== '200') {
    console.error(`❌ localhost:${port} yanıt vermiyor (HTTP ${code})`);
    process.exit(1);
  }
} catch {
  console.error(`❌ localhost:${port} erişilemiyor`);
  process.exit(1);
}

const ip = getLanIp();
console.log('');
console.log(`✅ Önizleme sunucusu çalışıyor (port ${port})`);
if (ip) console.log(`   Yerel: http://${ip}:${port}`);
console.log('');
console.log('🌐 Tünel açılıyor… (bu pencereyi KAPATMAYIN)');
console.log('');
console.log('Telefonda çıkan https://....loca.lt sayfasında:');
console.log('   1) "Tunnel hosted by" kutusundaki IP’yi kopyala');
console.log('   2) IP Address alanına yapıştır → Submit');
console.log('');
console.log('503 görürsen: bu komutu tekrar çalıştır, YENİ linki kullan.');
console.log('');

const child = spawn('npx', ['--yes', 'localtunnel', '--port', String(port)], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
