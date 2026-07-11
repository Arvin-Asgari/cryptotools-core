/**
 * rsa-core.js — CryptoTools.site
 * RSA key pair generation using the browser's built-in Web Crypto API.
 *
 * This is the exact logic running inside https://cryptotools.site/en/rsa-generator/
 * Private keys are generated in your browser and NEVER leave your device.
 *
 * No external libraries required — uses native window.crypto.subtle
 *
 * License: MIT
 */

/**
 * Generate an RSA key pair (public + private) in PEM format.
 * @param {number} modulusLength - Key size in bits: 2048 or 4096
 * @returns {Promise<{publicKey: string, privateKey: string}>}
 */
async function generateRSAKeyPair(modulusLength = 2048) {
  if (![2048, 4096].includes(modulusLength)) {
    throw new Error('modulusLength must be 2048 or 4096');
  }

  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength,
      publicExponent: new Uint8Array([1, 0, 1]), // 65537
      hash: 'SHA-256',
    },
    true,  // extractable
    ['sign', 'verify']
  );

  // Export and convert to PEM
  const [pubDer, privDer] = await Promise.all([
    window.crypto.subtle.exportKey('spki', keyPair.publicKey),
    window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey),
  ]);

  return {
    publicKey:  derToPem(pubDer,  'PUBLIC KEY'),
    privateKey: derToPem(privDer, 'PRIVATE KEY'),
  };
}

/**
 * Convert a DER-encoded ArrayBuffer to a PEM string.
 * @param {ArrayBuffer} derBuffer
 * @param {string} label - e.g. 'PUBLIC KEY' or 'PRIVATE KEY'
 * @returns {string}
 */
function derToPem(derBuffer, label) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(derBuffer)));
  const lines   = base64.match(/.{1,64}/g).join('\n');
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

// --- Quick demo ---
// generateRSAKeyPair(2048).then(({ publicKey, privateKey }) => {
//   console.log(publicKey);
//   console.log(privateKey);
// });
