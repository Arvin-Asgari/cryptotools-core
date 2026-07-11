# Código Núcleo de CryptoTools

Funciones criptográficas y utilidades de JavaScript de código abierto que impulsan [CryptoTools.site](https://cryptotools.site).

## Por qué existe este repositorio

CryptoTools.site maneja datos confidenciales de los usuarios: frases de contraseña, claves secretas, frases semilla y secretos de 2FA. Los usuarios merecen poder **verificar** que ninguno de estos datos sale de su navegador. Este repositorio hace posible esa verificación.

Cada función aquí es la lógica exacta que se ejecuta en el sitio web en producción. Puedes inspeccionarla, auditarla, ejecutarla en la consola de tu navegador o utilizarla en tus propios proyectos bajo la [Licencia MIT](#licencia).

## Qué se incluye

| Archivo | Función | Utilizado en |
|---------|---------|--------------|
| `aes-core.js` | Cifrado y descifrado AES-256 a través de CryptoJS | [Cifrador AES](https://cryptotools.site/es/aes-encrypt/) |
| `rsa-core.js` | Generación de pares de claves RSA-2048/4096 mediante Web Crypto API | [Generador RSA](https://cryptotools.site/es/rsa-generator/) |
| `hash-core.js` | Funciones de hash SHA-1, SHA-256, SHA-512 y MD5 | [Calculadora de Hash](https://cryptotools.site/es/hash-calculator/) |
| `hmac-core.js` | Códigos de autenticación de mensajes HMAC-SHA256/512 | [Calculadora HMAC](https://cryptotools.site/es/hmac-calculator/) |
| `totp-core.js` | Generación de códigos TOTP 2FA estándar RFC 6238 | [Generador TOTP](https://cryptotools.site/es/totp-calculator/) |
| `diffie-hellman-core.js` | Intercambio de claves ECDH a través de Web Crypto API | [Diffie-Hellman](https://cryptotools.site/es/diffie-hellman/) |
| `mnemonic-core.js` | Generación de frases mnemónicas BIP39 | [Generador Mnemónico](https://cryptotools.site/es/mnemonic-generator/) |
| `password-core.js` | Generación de contraseñas criptográficamente seguras | [Generador de Contraseñas](https://cryptotools.site/es/password-generator/) |

## Cómo verificar el comportamiento del lado del cliente

1. Abre cualquier herramienta de seguridad en [CryptoTools.site](https://cryptotools.site)
2. Presiona `F12` (o clic derecho → Inspeccionar) y haz clic en la pestaña **Red** (Network).
3. Marca la casilla **Conservar registro** (Preserve log) y limpia las entradas existentes.
4. Usa la herramienta: ingresa tus datos y realiza un cálculo.
5. Observa la pestaña Red: **verás cero solicitudes salientes con tus datos.**

Las únicas solicitudes que podrías ver son consultas de precios de mercado públicos (por ejemplo, el precio de BTC), nunca tus datos personales.

## Uso

Cada archivo es un módulo ES independiente. Impórtalo directamente en tu navegador o Node.js:

```html
<script src="aes-core.js"></script>
<script>
  const encrypted = aesEncrypt("Hola mundo", "mi-clave-secreta");
  const decrypted = aesDecrypt(encrypted, "mi-clave-secreta");
  console.log(decrypted); // "Hola mundo"
</script>
```

## Licencia

MIT: libre de usar, modificar y distribuir, incluido el uso comercial.

---

Creado con ❤️ por [CryptoTools.site](https://cryptotools.site)
