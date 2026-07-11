# CryptoTools Core

Open-source JavaScript cryptographic and utility functions that power [CryptoTools.site](https://cryptotools.site).

## Why this repo exists

CryptoTools.site handles sensitive user data — passphrases, secret keys, seed phrases, 2FA secrets. Users deserve to **verify** that none of this data ever leaves their browser. This repo makes that verification possible.

Every function here is the exact logic running inside the live site. You can inspect it, audit it, run it in your browser console, or use it in your own projects under the [MIT License](#license).

## What's included

| File | Powers | Used in |
|------|--------|---------|
| `aes-core.js` | AES-256 encrypt / decrypt via CryptoJS | [AES Encryptor](https://cryptotools.site/en/aes-encrypt/) |
| `rsa-core.js` | RSA-2048/4096 key pair generation via Web Crypto API | [RSA Generator](https://cryptotools.site/en/rsa-generator/) |
| `hash-core.js` | SHA-1, SHA-256, SHA-512, MD5 hashing | [Hash Calculator](https://cryptotools.site/en/hash-calculator/) |
| `hmac-core.js` | HMAC-SHA256/512 message authentication codes | [HMAC Calculator](https://cryptotools.site/en/hmac-calculator/) |
| `totp-core.js` | RFC 6238 TOTP 2FA code generation | [TOTP Generator](https://cryptotools.site/en/totp-calculator/) |
| `diffie-hellman-core.js` | ECDH key exchange via Web Crypto API | [Diffie-Hellman](https://cryptotools.site/en/diffie-hellman/) |
| `mnemonic-core.js` | BIP39 mnemonic phrase generation | [Mnemonic Generator](https://cryptotools.site/en/mnemonic-generator/) |
| `password-core.js` | Cryptographically secure password generation | [Password Generator](https://cryptotools.site/en/password-generator/) |

## How to verify client-side behaviour

1. Open any sensitive tool on [CryptoTools.site](https://cryptotools.site)
2. Press `F12` → click the **Network** tab
3. Check **Preserve log** and clear existing entries
4. Use the tool — enter your data and trigger a calculation
5. Watch the Network tab: **you will see zero outgoing requests containing your data**

The only network requests you may see are public market data fetches (e.g. BTC price) — never your personal input.

## Usage

Each file is a standalone ES module. Import directly in your browser or Node.js:

```html
<script src="aes-core.js"></script>
<script>
  const encrypted = aesEncrypt("Hello world", "my-passphrase");
  const decrypted = aesDecrypt(encrypted, "my-passphrase");
  console.log(decrypted); // "Hello world"
</script>
```

## License

MIT — free to use, modify and distribute. Commercial use is permitted.

---

Built with ❤️ by [CryptoTools.site](https://cryptotools.site)
