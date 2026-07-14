import os from 'os';

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

const port = process.argv[2] || '4173';
const ip = getLanIp();

console.log('');
console.log('📱 Telefonda test için (aynı Wi-Fi):');
if (ip) {
  console.log(`   http://${ip}:${port}`);
} else {
  console.log(`   http://BILGISAYAR_IP:${port}`);
  console.log('   (Mac: Sistem Ayarları → Wi-Fi → IP adresinizi kontrol edin)');
}
console.log('');
console.log('⚠️  localhost telefonda çalışmaz — yukarıdaki Network adresini kullanın.');
console.log('');
