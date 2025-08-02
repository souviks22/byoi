# 🧪 BYOI SDK · Bring Your Own Identity (Frontend Integration)

The **BYOI SDK** is a minimal, secure JavaScript library that enables frontend applications to authenticate users using their self-owned identity managed by the [BYOI Browser Extension](https://github.com/souviks22/byoi).

It handles communication with the extension, manages persistent sessions, and provides easy methods for sign-in and sign-out.

[![Module Format: ESM](https://img.shields.io/badge/Module%20Format-ESM-blue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4)](https://prettier.io/)
[![Lint: ESLint](https://img.shields.io/badge/lint-eslint-yellow)](https://eslint.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/souviks22/byoi/issues)

---

## 🚀 Features

* ✅ One-liner `signIn()` flow for BYOI authentication
* 🔁 Automatic session restore with `signinIfPersists()`
* 🔓 Secure messaging with the BYOI browser extension
* 🧼 Clean ESM-compatible, framework-agnostic design
* 🌐 Works with any modern frontend (React, Vue, Next.js, etc.)

---

## 📦 Installation

```bash
npm install @byoi/sdk
```

Or using a CDN (for vanilla usage):

```html
<script type="module">
  import BYOI from 'https://cdn.skypack.dev/@byoi/sdk'
</script>
```

---

## 📄 API

```ts
import BYOI from '@byoi/sdk'

// Trigger sign-in flow (calls extension and verifies user)
await BYOI.signin()

// Cleanly sign the user out (clears session)
await BYOI.signout()

// Restore session on page load (if previously authenticated)
const result = await BYOI.signinIfPersists()
```

Each function handles:

* Challenge communication with backend
* Secure messaging with the extension
* DID resolution and WebAuthn assertion
* Fallback logic if extension is missing

---

## 🔐 How It Works

```
Web Page
   |
   | SDK: BYOI.signin()
   ↓
BYOI Extension <-> WebAuthn + LocalStorage
   |
   → Resolves user’s DID, signs challenge, returns proof
```

> The SDK **does not store private keys** or touch cryptographic operations directly. That’s delegated to the secure extension.

---

## 🧠 Design Philosophy

* **Minimal API surface** – no configuration needed
* **Framework-agnostic** – use in React, Next.js, or plain JS
* **Strong separation of concerns** – handles only transport & session logic
* **Extension-first** – gracefully degrades if extension is missing

---

## 🧪 Example Integration

```ts
import BYOI from '@byoi/sdk'

document.querySelector('#login').addEventListener('click', async () => {
  try {
    await BYOI.signin()
    console.log('User authenticated')
  } catch (e) {
    console.error('Failed to authenticate', e)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  BYOI.signinIfPersists().then(user => {
    if (user) console.log('Session restored for', user)
  })
})
```

---

## 🛠 Compatibility

* ✅ Chrome / Edge (MV3)
* 🧩 Requires BYOI Extension to be installed and active
* ✅ TypeScript, ESM, modern bundlers
* ⛔ No backend dependency in SDK layer

---

## 📄 License

MIT © Souvik Sarkar

---

## 🤝 Related Projects

* [`byoi-extension`](https://github.com/souviks22/byoi) — BYOI Browser Extension (required for this SDK to work)
* [`did:ion`](https://identity.foundation/ion/) — Decentralized Identifier Method
* [`webauthn`](https://www.w3.org/TR/webauthn/) — Core standard used for device-based authentication
