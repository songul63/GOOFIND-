import { spawn, execSync } from 'child_process';
import os from 'os';

const port = Number(process.argv[2] || 4173);

function getLanIp() {
  try {
    const nets = os.networkInterfaces();
    for (const entries of Object.values(nets)) {
      for (const net of entries ?? []) {
        if (net.family === 'IPv4' && !net.internal) return net.address;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

function portInUse(p) {
  try {
    const out = execSync(`lsof -ti :${p}`, { encoding: 'utf8' }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
}

const ip = getLanIp();
const url = ip ? `http://${ip}:${port}` : `http://BILGISAYAR_IP:${port}`;
const isHotspotIp = ip?.startsWith('172.20.10.') || ip?.startsWith('172.16.') || false;

console.log('');
console.log('📱 Telefonda test için (aynı Wi-Fi):');
console.log(`   ${url}`);
console.log('');
if (isHotspotIp) {
  console.log('⚠️  Mac şu an iPhone hotspot’una bağlı görünüyor.');
  console.log('   Telefon çoğu zaman bu adrese Safari’den ulaşamaz.');
  console.log('   Çözüm: Mac VE telefonu aynı ev Wi-Fi’sine bağlayın, sonra npm run phone tekrar çalıştırın.');
  console.log('   Alternatif: npm run phone:tunnel (internet üzerinden geçici link)');
  console.log('');
}
console.log('⚠️  localhost telefonda çalışmaz — yukarıdaki adresi Safari’de açın.');
console.log('');

if (portInUse(port)) {
  console.log(`✅ Port ${port} zaten kullanımda — önizleme sunucusu çalışıyor olabilir.`);
  console.log(`   Telefonda doğrudan açın: ${url}`);
  console.log('');
  console.log('   Yeniden başlatmak için: npm run phone:stop && npm run phone');
  console.log('');
  process.exit(0);
}

console.log(`🚀 Önizleme sunucusu başlatılıyor (port ${port})...`);
console.log('');

const child = spawn(
  'npx',
  ['vite', 'preview', '--host', '0.0.0.0', '--port', String(port)],
  { stdio: 'inherit', shell: true },
);

child.on('exit', (code) => process.exit(code ?? 0));
