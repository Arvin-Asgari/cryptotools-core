/**
 * totp-core.js — CryptoTools.site
 * RFC 6238 Time-based One-Time Password (TOTP) generation.
 * Compatible with Google Authenticator, Authy, and all standard 2FA apps.
 *
 * This is the exact logic running inside https://cryptotools.site/en/totp-calculator/
 * Your 2FA secret seed NEVER leaves your browser.
 *
 * Uses the OTPAuth library: https://github.com/hectorm/otpauth
 * CDN: https://cdnjs.cloudflare.com/ajax/libs/otpauth/9.1.2/otpauth.umd.min.js
 *
 * License: MIT
 */

/**
 * Generate a TOTP code from a Base32-encoded secret.
 * @param {string} base32Secret - The Base32 secret from your 2FA QR code
 * @param {Object} options
 * @param {number} [options.digits=6]    - Number of digits in the OTP
 * @param {number} [options.period=30]   - Time step in seconds
 * @param {string} [options.algorithm='SHA1'] - Hash algorithm
 * @returns {{ code: string, secondsRemaining: number, period: number }}
 */
function generateTOTP(base32Secret, { digits = 6, period = 30, algorithm = 'SHA1' } = {}) {
  // Requires OTPAuth library loaded on the page
  const totp = new OTPAuth.TOTP({
    secret:    OTPAuth.Secret.fromBase32(base32Secret.replace(/\s/g, '').toUpperCase()),
    digits,
    period,
    algorithm,
  });

  const code = totp.generate();
  const epoch = Math.floor(Date.now() / 1000);
  const secondsRemaining = period - (epoch % period);

  return { code, secondsRemaining, period };
}

/**
 * Validate a TOTP code against a Base32 secret.
 * Accepts codes from the previous, current, and next time windows.
 * @param {string} base32Secret
 * @param {string} userCode - The 6-digit code the user entered
 * @returns {boolean}
 */
function validateTOTP(base32Secret, userCode) {
  const totp = new OTPAuth.TOTP({
    secret: OTPAuth.Secret.fromBase32(base32Secret.replace(/\s/g, '').toUpperCase()),
  });
  // delta: allow ±1 window to account for clock skew
  const delta = totp.validate({ token: userCode, window: 1 });
  return delta !== null;
}

// --- Quick demo ---
// const { code, secondsRemaining } = generateTOTP('JBSWY3DPEHPK3PXP');
// console.log(`Current code: ${code} (valid for ${secondsRemaining}s)`);
