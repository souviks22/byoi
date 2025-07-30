export const injectExtensionFallback = () => {
  const id = 'byoi-extension-fallback'
  if (document.getElementById(id)) return

  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0 }
      to { opacity: 1 }
    }

    #${id} {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 90%;
      padding: 16px 24px;
      border-radius: 14px;
      font-family: system-ui, sans-serif;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      z-index: 2147483647;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      animation: fadeIn 0.3s ease-out;
      border: 1px solid transparent;
    }

    #${id}-message {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    #${id} button {
      all: unset;
      cursor: pointer;
      background: #2563eb;
      color: white;
      padding: 6px 14px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      transition: background 0.2s ease-in-out;
    }

    #${id} button:hover {
      background: #1e40af;
    }

    #${id} .dismiss {
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    #${id} .dismiss:hover {
      opacity: 1;
    }

    @media (prefers-color-scheme: dark) {
      #${id} {
        background: #1e293b;
        color: #f8fafc;
        border-color: #334155;
      }

      #${id} button {
        background: #3b82f6;
      }

      #${id} button:hover {
        background: #2563eb;
      }
    }

    @media (prefers-color-scheme: light) {
      #${id} {
        background: #fef3c7;
        color: #92400e;
        border-color: #facc15;
      }

      #${id} button {
        background: #2563eb;
      }

      #${id} button:hover {
        background: #1d4ed8;
      }
    }
  `
  document.head.appendChild(style)

  const banner = document.createElement('div')
  banner.id = id
  banner.innerHTML = `
    <div id="${id}-message">
      <span>🧩</span>
      <span><strong>BYOI Extension</strong> is not installed</span>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <button onclick="window.open('https://chromewebstore.google.com/', '_blank')">Install</button>
      <span class="dismiss" onclick="document.getElementById('${id}').remove()">✕</span>
    </div>
  `
  document.body.appendChild(banner)
}
