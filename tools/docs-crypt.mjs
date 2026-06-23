#!/usr/bin/env node
// docs-crypt.mjs — encrypt/decrypt the private maintenance guide for the
// Bethany Lutheran website.
//
// The site repo is PUBLIC, so the guide is stored only as an AES-256-GCM
// encrypted, self-contained HTML page. The password is never stored in the
// repo. The encrypted page (site-guide/index.html) is the canonical copy —
// decrypt it to edit, then re-encrypt.
//
// Usage:
//   DOCS_PASSWORD='your-password' node tools/docs-crypt.mjs encrypt <source.html> <out.html>
//   DOCS_PASSWORD='your-password' node tools/docs-crypt.mjs decrypt <page.html>  <source.html>
//
// If DOCS_PASSWORD is not set, you will be prompted.

import crypto from 'node:crypto';
import fs from 'node:fs';
import readline from 'node:readline';

const ITER = 250000; // PBKDF2 iterations
const TAG_BYTES = 16;

function usage() {
  console.error('Usage:');
  console.error("  DOCS_PASSWORD=... node tools/docs-crypt.mjs encrypt <source.html> <out.html>");
  console.error("  DOCS_PASSWORD=... node tools/docs-crypt.mjs decrypt <page.html> <source.html>");
  process.exit(1);
}

async function getPassword() {
  if (process.env.DOCS_PASSWORD) return process.env.DOCS_PASSWORD;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const pw = await new Promise((res) => rl.question('Password: ', (a) => res(a)));
  rl.close();
  if (!pw) { console.error('No password provided.'); process.exit(1); }
  return pw;
}

function pageTemplate(payloadJson) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Bethany Lutheran &middot; Website Maintenance Guide</title>
<style>
  :root { --accent:#9d2b2b; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: Georgia, 'Times New Roman', serif; color:#222; background:#f4f1ea; line-height:1.6; }
  .lock { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:2rem; }
  .lock form { background:#fff; padding:2.5rem; border-radius:.6rem; box-shadow:0 12px 40px rgba(0,0,0,.12); max-width:380px; width:100%; text-align:center; }
  .lock h1 { font-size:1.4rem; margin:.2rem 0 1rem; }
  .lock p { color:#666; font-size:.95rem; }
  .lock input { width:100%; padding:.7rem .9rem; font-size:1rem; border:1px solid #ccc; border-radius:.4rem; margin:1rem 0 .75rem; }
  .lock button { width:100%; padding:.7rem; font-size:1rem; color:#fff; background:var(--accent); border:0; border-radius:.4rem; cursor:pointer; }
  .lock button:hover { background:#7e1f1f; }
  .lock .err { color:var(--accent); font-size:.9rem; min-height:1.2em; }
  .doc { display:none; max-width:820px; margin:0 auto; padding:2.5rem 1.5rem 5rem; }
  .doc h1 { color:var(--accent); border-bottom:3px solid var(--accent); padding-bottom:.4rem; }
  .doc h2 { color:var(--accent); margin-top:2.4rem; border-bottom:1px solid #ddd; padding-bottom:.3rem; }
  .doc h3 { margin-top:1.6rem; }
  .doc code { background:#eee5d6; padding:.1rem .35rem; border-radius:.25rem; font-family: 'Courier New', monospace; font-size:.92em; }
  .doc pre { background:#2d2a26; color:#f4f1ea; padding:1rem 1.2rem; border-radius:.5rem; overflow:auto; }
  .doc pre code { background:none; color:inherit; padding:0; }
  .doc table { border-collapse:collapse; width:100%; margin:1rem 0; }
  .doc th, .doc td { border:1px solid #ddd; padding:.5rem .7rem; text-align:left; vertical-align:top; }
  .doc th { background:#eee5d6; }
  .doc .note { background:#fff8e6; border-left:4px solid #e0b84c; padding:.8rem 1rem; margin:1rem 0; }
  .doc .warn { background:#fdecea; border-left:4px solid var(--accent); padding:.8rem 1rem; margin:1rem 0; }
  .doc a { color:var(--accent); }
</style>
</head>
<body>
<div class="lock" id="lock">
  <form id="form" autocomplete="off">
    <h1>&#128274; Website Maintenance Guide</h1>
    <p>This page is private. Enter the password to view it.</p>
    <input type="password" id="pw" placeholder="Password" autofocus>
    <button type="submit">Unlock</button>
    <div class="err" id="err"></div>
  </form>
</div>
<div class="doc" id="doc"></div>
<script id="payload" type="application/json">${payloadJson}</script>
<script>
(function () {
  var P = JSON.parse(document.getElementById('payload').textContent);
  function b64(s){ var bin=atob(s), b=new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) b[i]=bin.charCodeAt(i); return b; }
  async function decrypt(pw){
    var enc = new TextEncoder();
    var km = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey(
      { name:'PBKDF2', salt:b64(P.salt), iterations:P.iter, hash:'SHA-256' },
      km, { name:'AES-GCM', length:256 }, false, ['decrypt']);
    var buf = await crypto.subtle.decrypt({ name:'AES-GCM', iv:b64(P.iv) }, key, b64(P.ct));
    return new TextDecoder().decode(buf);
  }
  document.getElementById('form').addEventListener('submit', async function(e){
    e.preventDefault();
    var err = document.getElementById('err');
    err.textContent = '';
    try {
      var html = await decrypt(document.getElementById('pw').value);
      document.getElementById('doc').innerHTML = html;
      document.getElementById('doc').style.display = 'block';
      document.getElementById('lock').style.display = 'none';
      document.title = 'Bethany Lutheran \\u00b7 Website Maintenance Guide';
      window.scrollTo(0,0);
    } catch (_) {
      err.textContent = 'Incorrect password. Please try again.';
    }
  });
})();
</script>
</body>
</html>
`;
}

async function main() {
  const [mode, inPath, outPath] = process.argv.slice(2);
  if (!mode || !inPath || !outPath) usage();
  const password = await getPassword();

  if (mode === 'encrypt') {
    const plain = fs.readFileSync(inPath, 'utf8');
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12);
    const key = crypto.pbkdf2Sync(password, salt, ITER, 32, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    const blob = Buffer.concat([ct, tag]);
    const payload = JSON.stringify({
      v: 1, kdf: 'PBKDF2-SHA256', iter: ITER,
      salt: salt.toString('base64'), iv: iv.toString('base64'), ct: blob.toString('base64'),
    });
    fs.writeFileSync(outPath, pageTemplate(payload));
    console.log('Encrypted ' + inPath + ' -> ' + outPath);
  } else if (mode === 'decrypt') {
    const page = fs.readFileSync(inPath, 'utf8');
    const m = page.match(/<script id="payload" type="application\/json">([\s\S]*?)<\/script>/);
    if (!m) { console.error('No payload found in ' + inPath); process.exit(1); }
    const P = JSON.parse(m[1]);
    const blob = Buffer.from(P.ct, 'base64');
    const tag = blob.subarray(blob.length - TAG_BYTES);
    const ctOnly = blob.subarray(0, blob.length - TAG_BYTES);
    const key = crypto.pbkdf2Sync(password, Buffer.from(P.salt, 'base64'), P.iter, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(P.iv, 'base64'));
    decipher.setAuthTag(tag);
    let plain;
    try {
      plain = Buffer.concat([decipher.update(ctOnly), decipher.final()]).toString('utf8');
    } catch (_) {
      console.error('Decryption failed — wrong password?');
      process.exit(1);
    }
    fs.writeFileSync(outPath, plain);
    console.log('Decrypted ' + inPath + ' -> ' + outPath);
  } else {
    usage();
  }
}

main();
