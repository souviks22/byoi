import type { WindowMessage } from '@/types/messaging'
import { mountDidSelector } from '@/components/content/DidAuthentication'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  main(ctx) {
    console.log('Hello content.')
    window.addEventListener('message', ({ source: sender, data }) => {
      if (sender != window) return
      const { source, type, challenge } = data as WindowMessage
      if (source !== 'byoi-sdk' || type !== 'signin-request') return
      let ui: globalThis.IntegratedContentScriptUi<unknown>
      const closeHandler = () => ui?.remove()
      ui = createIntegratedUi(ctx, {
        position: 'modal',
        anchor: 'body',
        append: 'first',
        onMount: mountDidSelector(challenge, closeHandler),
        onRemove: root => root?.unmount()
      })
      ui.mount()
    })
  }
})
