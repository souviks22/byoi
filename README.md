# 🪪 BYOI: Bring Your Own Identity

[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/souviks22/byoi/issues)

---

**BYOI** (Bring Your Own Identity) is a modern, passwordless authentication system that gives users **full control** over their identity across the web. It uses **Decentralized Identifiers (DIDs)** with the [ION](https://identity.foundation/ion/) method and **biometric authentication** via [WebAuthn](https://webauthn.guide/), delivered through:

* A sleek **browser extension**
* A plug-and-play **SDK for developers**

---

## 🔍 Why BYOI?

Traditional login systems (e.g., passwords, social logins, OAuth) are flawed:

* 🔐 **Centralized control** over user identities
* 😩 **Password fatigue** and weak password reuse
* 🧱 **Vendor lock-in** for developers
* 👀 **Privacy violations** through third-party tracking
* 📱 **Lack of portability** across devices or platforms

**BYOI** solves these with a self-sovereign, secure, and privacy-preserving system.

---

## 🧠 Core Architecture

### 🔐 Browser Extension (User Agent)

* Acts as the **user-owned identity wallet**
* Locally creates and stores **ION DIDs** and **cryptographic keys**
* Authenticates users via **device-native biometrics** (WebAuthn)
* Handles authentication requests initiated by websites

### 🧰 SDK (Developer Toolkit)

* Simple integration of BYOI login into web apps
* Sends authentication requests to the extension
* Verifies signed responses
* Abstracts DID resolution and WebAuthn under the hood

---

## ✅ What BYOI Solves

| Challenge                      | Traditional Systems                 | BYOI Solution                             |
| ------------------------------ | ----------------------------------- | ----------------------------------------- |
| Password management            | Weak/reused passwords               | 🔒 Passwordless biometric login           |
| Account silos                  | Platform-specific identity          | 🔁 Reusable identity across websites      |
| Centralized identity providers | Risk of breaches & lock-in          | 🛡️ Decentralized, user-owned identities  |
| Developer complexity           | OAuth setup, token handling         | 🧰 Plug-and-play SDK                      |
| Privacy & tracking             | Shared user data with third parties | 🙈 Zero data leakage, no third-party auth |

---

## 🌐 Benefits at a Glance

### For Users

* 🔑 Own and carry your identity anywhere online
* 👆 Use secure biometric authentication
* ❌ Say goodbye to passwords and third-party logins

### For Developers

* ⚙️ No password storage or complex auth logic
* 🚀 Seamless UX with one-click secure login
* 🧬 Compliant with open standards (DID, WebAuthn)

---

## 🚀 Use Cases

* 🕵️‍♂️ Privacy-first web applications
* 🧩 Decentralized or federated platforms
* 💰 Fintech and legal tech platforms
* 🏥 Healthcare apps
* 🌐 Online communities valuing digital sovereignty

---

## 📦 Project Roadmap

This README provides a **high-level overview**. Detailed documentation is organized separately:

* [`/extension`](./extension): Architecture, flows & security
* [`/sdk`](./sdk): SDK API reference & integration guide

---

## 👨‍💻 Built With

* [DID ION](https://identity.foundation/ion/) — Decentralized Identifier method by Microsoft
* [WebAuthn](https://webauthn.guide/) — W3C standard for passwordless authentication
* TypeScript, IndexedDB, Web Extensions API, Web Crypto API

---

## 💬 Feedback & Contributions

We’re building a future where **identity belongs to the user** — not the platform.

* Found a bug or security issue? [Open an issue](https://github.com/souviks22/byoi/issues)
* Want to contribute? [Start a discussion](https://github.com/souviks22/byoi/discussions) or send a pull request
* Questions or ideas? Let’s connect!

> MIT Licensed • Built with ❤️ for a decentralized web
