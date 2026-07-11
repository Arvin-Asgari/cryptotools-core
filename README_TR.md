# CryptoTools Çekirdek Kodları (Core)

[CryptoTools.site](https://cryptotools.site) adresine güç veren açık kaynaklı JavaScript kriptografi ve yardımcı fonksiyonları.

## Bu depo neden var?

CryptoTools.site hassas kullanıcı verilerini (parolalar, gizli anahtarlar, kurtarma kelimeleri, 2FA kodları) işler. Kullanıcılar bu verilerin hiçbirinin tarayıcılarından çıkmadığını **doğrulama** hakkına sahiptir. Bu depo, bu doğrulamayı yapabilmenizi sağlar.

Buradaki her fonksiyon, canlı web sitesinde çalışan mantığın birebir aynısıdır. İnceleyebilir, denetleyebilir, tarayıcınızın konsolunda çalıştırabilir veya [MIT Lisansı](#lisans) altında kendi projelerinizde kullanabilirsiniz.

## Neler dahil?

| Dosya | Özellik | Kullanılan Araç |
|-------|---------|-----------------|
| `aes-core.js` | CryptoJS aracılığıyla AES-256 şifreleme / şifre çözme | [AES Şifreleyici](https://cryptotools.site/tr/aes-encrypt/) |
| `rsa-core.js` | Web Crypto API kullanarak RSA-2048/4096 anahtar çifti oluşturma | [RSA Üretici](https://cryptotools.site/tr/rsa-generator/) |
| `hash-core.js` | SHA-1, SHA-256, SHA-512, MD5 hash hesaplama | [Hash Hesaplayıcı](https://cryptotools.site/tr/hash-calculator/) |
| `hmac-core.js` | HMAC-SHA256/512 mesaj doğrulama kodları | [HMAC Hesaplayıcı](https://cryptotools.site/tr/hmac-calculator/) |
| `totp-core.js` | RFC 6238 standartlarında TOTP 2FA kod oluşturma | [TOTP Üretici](https://cryptotools.site/tr/totp-calculator/) |
| `diffie-hellman-core.js` | Web Crypto API üzerinden ECDH anahtar değişimi | [Diffie-Hellman](https://cryptotools.site/tr/diffie-hellman/) |
| `mnemonic-core.js` | BIP39 standartlarında 12/24 kelimelik kurtarma parolası oluşturma | [Mnemonic Üretici](https://cryptotools.site/tr/mnemonic-generator/) |
| `password-core.js` | Kriptografik olarak güvenli rastgele şifre oluşturma | [Şifre Üretici](https://cryptotools.site/tr/password-generator/) |

## İstemci Tarafı Çalışma Şekli Nasıl Doğrulanır?

1. [CryptoTools.site](https://cryptotools.site) üzerindeki herhangi bir güvenlik aracını açın.
2. Geliştirici Araçlarını açmak için `F12` tuşuna basın (veya sağ tıklayıp İncele deyin).
3. Üstteki **Network** (Ağ) sekmesine tıklayın.
4. **Preserve log** (Günlüğü koru) seçeneğini işaretleyin ve mevcut girdileri temizleyin.
5. Aracı kullanın — veri girin ve bir işlem gerçekleştirin.
6. Ağ sekmesini izleyin: **verilerinizi içeren sıfır giden istek göreceksiniz.**

Görebileceğiniz tek istekler genel piyasa fiyatı sorgulamalarıdır (örneğin BTC fiyatı) — asla kişisel girdileriniz değil.

## Kullanım

Her dosya bağımsız bir ES modülüdür. Doğrudan tarayıcınızda veya Node.js ortamında içe aktarabilirsiniz:

```html
<script src="aes-core.js"></script>
<script>
  const encrypted = aesEncrypt("Merhaba dünya", "gizli-parolam");
  const decrypted = aesDecrypt(encrypted, "gizli-parolam");
  console.log(decrypted); // "Merhaba dünya"
</script>
```

## Lisans

MIT — Kullanımı, değiştirilmesi ve dağıtılması tamamen ücretsizdir. Ticari kullanıma izin verilir.

---

[CryptoTools.site](https://cryptotools.site) tarafından ❤️ ile yapılmıştır.
