/**
 * hash-core.js — CryptoTools.site
 * SHA-1, SHA-256, SHA-512 hashing via the browser's built-in Web Crypto API.
 * MD5 hashing via CryptoJS (no server required).
 *
 * This is the exact logic running inside https://cryptotools.site/en/hash-calculator/
 * Input text is hashed locally — never sent to a server.
 *
 * SHA family: no external library required (uses window.crypto.subtle)
 * MD5: requires CryptoJS — https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
 *
 * License: MIT
 */

/**
 * Hash a string using SHA-1, SHA-256, or SHA-512 via Web Crypto API.
 * @param {string} message   - The input text to hash
 * @param {'SHA-1'|'SHA-256'|'SHA-512'} algorithm
 * @returns {Promise<string>} - Lowercase hex digest
 */
async function shaHash(message, algorithm = 'SHA-256') {
  const validAlgos = ['SHA-1', 'SHA-256', 'SHA-512'];
  if (!validAlgos.includes(algorithm)) {
    throw new Error(`algorithm must be one of: ${validAlgos.join(', ')}`);
  }
  const encoder = new TextEncoder();
  const data     = encoder.encode(message);
  const hashBuf  = await window.crypto.subtle.digest(algorithm, data);
  return bufferToHex(hashBuf);
}

/**
 * Hash a string using MD5 (via CryptoJS — not available in Web Crypto API).
 * @param {string} message
 * @returns {string} - Lowercase hex digest
 */
function md5Hash(message) {
  // Requires CryptoJS loaded on the page
  return CryptoJS.MD5(message).toString(CryptoJS.enc.Hex);
}

/**
 * Convert an ArrayBuffer to a lowercase hex string.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// --- Quick demo ---
// shaHash('Hello, world!', 'SHA-256').then(h => console.log('SHA-256:', h));
// shaHash('Hello, world!', 'SHA-512').then(h => console.log('SHA-512:', h));
// console.log('MD5:', md5Hash('Hello, world!'));
