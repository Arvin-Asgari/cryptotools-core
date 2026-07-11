/**
 * diffie-hellman-core.js — CryptoTools.site
 * Elliptic Curve Diffie-Hellman (ECDH) key exchange
 * using the browser's built-in Web Crypto API.
 *
 * This is the exact logic running inside https://cryptotools.site/en/diffie-hellman/
 * Your private keys and shared secret NEVER leave your browser.
 *
 * No external libraries required.
 *
 * License: MIT
 */

/**
 * Generate an ECDH key pair (public + private).
 * @param {'P-256'|'P-384'|'P-521'} curve
 * @returns {Promise<{publicKey: CryptoKey, privateKey: CryptoKey, publicKeyHex: string}>}
 */
async function generateECDHKeyPair(curve = 'P-256') {
  const keyPair = await window.crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: curve },
    true,               // extractable
    ['deriveKey', 'deriveBits']
  );

  // Export public key as raw bytes and convert to hex for display
  const rawPublic = await window.crypto.subtle.exportKey('raw', keyPair.publicKey);
  const publicKeyHex = bufferToHex(rawPublic);

  return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey, publicKeyHex };
}

/**
 * Derive a shared secret from your private key and the other party's public key.
 * Both parties arrive at the same secret without ever transmitting it.
 *
 * @param {CryptoKey} myPrivateKey         - Your private ECDH key
 * @param {CryptoKey} theirPublicKey       - The other party's public ECDH key
 * @param {'P-256'|'P-384'|'P-521'} curve
 * @returns {Promise<string>}              - Shared secret as hex string
 */
async function deriveSharedSecret(myPrivateKey, theirPublicKey, curve = 'P-256') {
  const bitLengths = { 'P-256': 256, 'P-384': 384, 'P-521': 528 };
  const bits = await window.crypto.subtle.deriveBits(
    { name: 'ECDH', public: theirPublicKey },
    myPrivateKey,
    bitLengths[curve]
  );
  return bufferToHex(bits);
}

/**
 * Import an ECDH public key from its raw hex representation.
 * @param {string} hexPublicKey
 * @param {'P-256'|'P-384'|'P-521'} curve
 * @returns {Promise<CryptoKey>}
 */
async function importPublicKeyFromHex(hexPublicKey, curve = 'P-256') {
  const rawBytes = hexToBuffer(hexPublicKey);
  return window.crypto.subtle.importKey(
    'raw',
    rawBytes,
    { name: 'ECDH', namedCurve: curve },
    true,
    []   // public keys have no usages in ECDH
  );
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, 2), 16);
  }
  return bytes.buffer;
}

// --- Quick demo ---
// (async () => {
//   const alice = await generateECDHKeyPair();
//   const bob   = await generateECDHKeyPair();
//   const aliceSecret = await deriveSharedSecret(alice.privateKey, bob.publicKey);
//   const bobSecret   = await deriveSharedSecret(bob.privateKey,   alice.publicKey);
//   console.log('Same secret?', aliceSecret === bobSecret); // true
// })();
