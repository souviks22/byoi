# 🧩 BYOI Extension · Bring Your Own Identity

A secure browser extension enabling **user-owned decentralized identity** across the web.  
Designed to pair with the BYOI SDK, this extension empowers users to authenticate, manage DIDs, and perform cryptographic operations—all from their browser.

<p align="left">
  <a href="https://developer.chrome.com/docs/extensions/mv3/intro/"><img alt="Manifest V3" src="https://img.shields.io/badge/Manifest%20V3-Enabled-green"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/Built%20with-TypeScript-3178c6"></a>
  <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4">
  <img alt="Lint: ESLint" src="https://img.shields.io/badge/lint-eslint-yellow">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg">
</p>

---

## 🌐 Overview

**BYOI (Bring Your Own Identity)** is a privacy-first authentication framework designed to let users bring their identity across websites—securely and independently.  
This extension forms the cryptographic anchor of that system.

It communicates with the BYOI SDK injected in websites, handling:

- 🔐 Secure WebAuthn-based identity operations
- 🔑 Decentralized Identifier (DID) resolution and signing
- 🔄 Persistent session storage across tabs
- ⚡ Lightweight messaging channel between content scripts and web apps

---

## ✨ Key Features

- ✅ Local-first, zero-tracking identity provider
- 🔐 Hardware-backed WebAuthn key management
- 📁 Private key encryption using AES-GCM
- 🧩 Compatible with any frontend via BYOI SDK
- ☁️ No cloud sync or server dependency
- 🌙 Auto-themed light/dark UI
- 🛡️ Manifest V3, CSP-safe architecture

---

## 🧠 Architecture

```

Web Page <-> BYOI SDK
↓
Content Script <-> Background Service Worker
↓
Encrypted Key Storage (via WebAuthn + AES-GCM)

```

---

## 🛠️ Usage

> The extension must be **installed** in the browser for connected websites to authenticate users via BYOI SDK.

### 🧪 Local Development (Chrome)

```bash
git clone https://github.com/your-org/byoi-extension.git
cd byoi-extension
npm install
npm run build
```

Then:

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **“Load unpacked”**
4. Select the `dist/` folder

---

## 💼 Integration with SDK

This extension is built to work with the [`@byoi/sdk`](https://github.com/your-org/byoi-sdk).
The SDK handles frontend logic and communicates with this extension via message passing (`window.postMessage`, `chrome.runtime.sendMessage`, etc.).

Example:

```ts
import { BYOI } from '@byoi/sdk'

const sdk = new BYOI()
await sdk.signIn()
```

---

## 🧪 Development Tools

* [TypeScript](https://www.typescriptlang.org/)
* [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
* [Vite](https://vitejs.dev/) or [WXT](https://wxt.dev/) for fast HMR
* `webextension-polyfill` for browser compatibility

---

## 🔐 Security Principles

* **No data ever leaves the browser** unless explicitly requested by the user.
* **Private keys** are encrypted using WebAuthn credentials and AES-GCM, never exposed to content scripts or websites.
* Extension operates on the principle of **explicit consent** and **deterministic behavior**.

---

## 📄 License

MIT © \[Your Name or Organization]

---

## 📌 Roadmap

* [ ] 🔧 Web Store Publishing (Chrome + Edge)
* [ ] 🦊 Firefox MV3 Support
* [ ] 🌐 DIDComm v2 Integration
* [ ] 🔁 Backup & Recovery (Encrypted Export)
* [ ] 🔑 Key Rotation + DID Update
* [ ] 🧪 In-extension Developer Tools

---

## 🙌 Acknowledgements

* [W3C DID Spec](https://www.w3.org/TR/did-core/)
* [WebAuthn](https://www.w3.org/TR/webauthn/)
* [ION DID Method](https://identity.foundation/ion/)
* [WXT](https://wxt.dev/) – Web Extension Toolkit

