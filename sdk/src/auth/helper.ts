import type { WindowMessage } from '../types/messaging'

export const detectExtension = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => resolve(false), 1000)
        const existence = ({ source: sender, data }: MessageEvent) => {
            try {
                if (sender !== window) return
                const { source, type } = data as WindowMessage
                if (source !== 'byoi-extension' || type !== 'signin-pong') return
                window.removeEventListener('message', existence)
                clearTimeout(timeout)
                resolve(true)
            } catch (e) {
                reject(e)
            }
        }
        window.addEventListener('message', existence)
        const message: WindowMessage = {
            source: 'byoi-sdk',
            type: 'signin-ping'
        }
        window.postMessage(message, window.location.origin)
    })
}

export const decodeDER = (signature: Uint8Array) => {
    if (signature[0] !== 0x30) throw new Error('Invalid DER prefix')
    let offset = 2
    if (signature[offset] !== 0x02) throw new Error('Invalid INTEGER marker for r')
    const rLen = signature[offset + 1]
    let r = signature.slice(offset + 2, offset + 2 + rLen)
    offset = offset + 2 + rLen
    if (signature[offset] !== 0x02) throw new Error('Invalid INTEGER marker for s')
    const sLen = signature[offset + 1]
    let s = signature.slice(offset + 2, offset + 2 + sLen)
    const normalize = (buf: Uint8Array) => {
        if (buf.length === 33 && buf[0] === 0x00) {
            buf = buf.slice(1)
        }
        if (buf.length > 32) throw new Error('Normalized length > 32 bytes');
        const out = new Uint8Array(32)
        out.set(buf, 32 - buf.length)
        return out
    }
    const rRaw = normalize(r)
    const sRaw = normalize(s)
    return new Uint8Array([...rRaw, ...sRaw])
}
