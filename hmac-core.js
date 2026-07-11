/**
 * hmac-core.js — CryptoTools.site
 * HMAC-SHA256 and HMAC-SHA512 message authentication codes
 * via the browser's built-in Web Crypto API.
 *
 * This is the exact logic running inside https://cryptotools.site/en/hmac-calculator/
 * Your secret key and message never leave your browser.
 *
 * No external libraries required.
 *
 * License: MIT
 */

/**
 * Compute an HMAC digest for a message using a secret key.
 * @param {string} message    - The message to authenticate
 * @param {string} secretKey  - The HMAC secret key
 * @param {'SHA-256'|'SHA-512'} algorithm
 * @returns {Promise<string>} - Lowercase hex HMAC digest
 */
async function computeHMAC(message, secretKey, algorithm = 'SHA-256') {
  const validAlgos = ['SHA-256', 'SHA-512'];
  if (!validAlgos.includes(algorithm)) {
    throw new Error(`algorithm must be one of: ${validAlgos.join(', ')}`);
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretKey);
  const msgData = encoder.encode(message);

  // Import the key
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: algorithm },
    false,       // not extractable
    ['sign']
  );

  // Sign (compute HMAC)
  const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);

  return bufferToHex(signature);
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
// computeHMAC('Hello, world!', 'my-secret', 'SHA-256')
//   .then(h => console.log('HMAC-SHA256:', h));
