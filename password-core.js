/**
 * password-core.js — CryptoTools.site
 * Cryptographically secure password generation using window.crypto.getRandomValues().
 *
 * This is the exact logic running inside https://cryptotools.site/en/password-generator/
 * Passwords are generated entirely in your browser — never sent anywhere.
 *
 * Uses window.crypto.getRandomValues() — NOT Math.random() — for true randomness.
 *
 * No external libraries required.
 *
 * License: MIT
 */

const CHARSETS = {
  uppercase:  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase:  'abcdefghijklmnopqrstuvwxyz',
  numbers:    '0123456789',
  symbols:    '!@#$%^&*()_+-=[]{}|;:,.<>?',
  // Ambiguous characters excluded when 'excludeAmbiguous' is true
  ambiguous:  'O0Il1',
};

/**
 * Generate a cryptographically secure random password.
 * @param {Object} options
 * @param {number}  [options.length=16]            - Password length (8–128)
 * @param {boolean} [options.uppercase=true]        - Include A-Z
 * @param {boolean} [options.lowercase=true]        - Include a-z
 * @param {boolean} [options.numbers=true]          - Include 0-9
 * @param {boolean} [options.symbols=true]          - Include symbols
 * @param {boolean} [options.excludeAmbiguous=false] - Exclude O, 0, I, l, 1
 * @returns {string} - The generated password
 */
function generatePassword({
  length           = 16,
  uppercase        = true,
  lowercase        = true,
  numbers          = true,
  symbols          = true,
  excludeAmbiguous = false,
} = {}) {
  let charset = '';
  if (uppercase) charset += CHARSETS.uppercase;
  if (lowercase) charset += CHARSETS.lowercase;
  if (numbers)   charset += CHARSETS.numbers;
  if (symbols)   charset += CHARSETS.symbols;

  if (!charset) throw new Error('At least one character set must be selected.');

  if (excludeAmbiguous) {
    charset = charset.split('').filter(c => !CHARSETS.ambiguous.includes(c)).join('');
  }

  // Use crypto.getRandomValues for cryptographic randomness
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map(v => charset[v % charset.length])
    .join('');
}

/**
 * Estimate password entropy in bits.
 * @param {string} password
 * @param {number} charsetSize - Number of unique characters in the pool
 * @returns {number} - Entropy in bits
 */
function passwordEntropy(password, charsetSize) {
  return Math.log2(Math.pow(charsetSize, password.length));
}

// --- Quick demo ---
// console.log(generatePassword({ length: 24, symbols: true }));
// console.log('Entropy:', passwordEntropy('example', 95).toFixed(1), 'bits');
