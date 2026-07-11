/**
 * aes-core.js — CryptoTools.site
 * AES-256 encrypt and decrypt using the CryptoJS library.
 *
 * This is the exact logic running inside https://cryptotools.site/en/aes-encrypt/
 * All processing happens in the browser — no data is ever sent to a server.
 *
 * Requires: https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
 *
 * License: MIT
 */

/**
 * Encrypt plaintext with AES-256 using a passphrase.
 * @param {string} plaintext  - The message to encrypt
 * @param {string} passphrase - The secret passphrase / key
 * @returns {string}          - Base64-encoded ciphertext
 */
function aesEncrypt(plaintext, passphrase) {
  if (!plaintext || !passphrase) {
    throw new Error('Both plaintext and passphrase are required.');
  }
  return CryptoJS.AES.encrypt(plaintext, passphrase).toString();
}

/**
 * Decrypt a CryptoJS AES ciphertext with the original passphrase.
 * @param {string} ciphertext - Base64-encoded ciphertext (from aesEncrypt)
 * @param {string} passphrase - The secret passphrase used during encryption
 * @returns {string}          - Decrypted plaintext
 */
function aesDecrypt(ciphertext, passphrase) {
  if (!ciphertext || !passphrase) {
    throw new Error('Both ciphertext and passphrase are required.');
  }
  const decryptedBytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
  if (!plaintext) {
    throw new Error('Decryption failed — wrong passphrase or corrupted ciphertext.');
  }
  return plaintext;
}

// --- Quick demo (remove in production) ---
// const ct = aesEncrypt("Hello, world!", "my-secret-key");
// console.log("Encrypted:", ct);
// console.log("Decrypted:", aesDecrypt(ct, "my-secret-key"));
