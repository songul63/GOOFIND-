#!/usr/bin/env node
/**
 * Pre-flight checks before App Store submission.
 * Run: npm run release:check
 */
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const checks = [];

function pass(msg) {
  checks.push({ ok: true, msg });
}

function fail(msg) {
  checks.push({ ok: false, msg });
}

function has(file, pattern) {
  if (!existsSync(file)) return false;
  return readFileSync(file, 'utf8').includes(pattern);
}

// Version
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
if (pkg.version && pkg.version !== '0.0.0') pass(`package.json version: ${pkg.version}`);
else fail('package.json version is still 0.0.0 — bump before release');

// iOS
if (has('ios/App/App/Info.plist', 'NSCameraUsageDescription')) pass('iOS privacy usage strings present');
else fail('Missing iOS privacy strings in Info.plist');

if (has('ios/App/App.xcodeproj/project.pbxproj', 'com.goofind.app')) pass('Bundle ID com.goofind.app configured');
else fail('Bundle ID not found in Xcode project');

if (has('ios/App/App.xcodeproj/project.pbxproj', 'MARKETING_VERSION = 1.0')) pass('Marketing version 1.0 set');
else fail('Check MARKETING_VERSION in project.pbxproj');

// Capacitor
if (has('capacitor.config.ts', 'com.goofind.app')) pass('Capacitor appId configured');
else fail('Capacitor appId missing');

if (has('capacitor.config.ts', 'gen-lang-client-0422005049.firebaseapp.com')) pass('Live Firebase URL in capacitor.config.ts');
else fail('Live app URL missing from capacitor.config.ts');

// Docs
if (existsSync('docs/APP_STORE_RELEASE.md')) pass('App Store release guide exists');
else fail('docs/APP_STORE_RELEASE.md missing');

// Build
try {
  execSync('npm run build', { stdio: 'pipe' });
  pass('Production web build succeeds');
} catch {
  fail('npm run build failed — fix errors before release');
}

console.log('\nGoofind App Store pre-flight\n');
for (const c of checks) {
  console.log(`${c.ok ? '✓' : '✗'} ${c.msg}`);
}
const failed = checks.filter((c) => !c.ok).length;
console.log(`\n${failed === 0 ? 'All checks passed.' : `${failed} issue(s) — fix before submitting.`}\n`);
process.exit(failed === 0 ? 0 : 1);
