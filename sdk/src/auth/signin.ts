import type { WindowMessage } from '../types/messaging'
import type { Base64Url, DidUser } from '../types/passkey'
import { injectExtensionFallback } from './fallback'
import { decodeDER, detectExtension } from './helper'
import * as uint8arrays from 'uint8arrays'

export const BYOI_SESSION_KEY = 'byoi-did-session'
export const MINUTE = 60 * 1000

export const authenticate = (user?: DidUser | null): Promise<{
    success: boolean
    trigger: 'signup' | 'signin' | 'no-persistence' | 'missing-extension'
    user: DidUser | null
}> => {
    return new Promise((resolve, reject) => {
        if (user === null) return resolve({ success: false, trigger: 'no-persistence', user: null })
        detectExtension().then(exists => {
            if (!exists) {
                injectExtensionFallback()
                resolve({ success: false, trigger: 'missing-extension', user: null })
            }
        }).catch(e => reject(e))

        const confirmation = ({ source: sender, data }: MessageEvent) => {
            try {
                if (sender !== window) return
                const { source, type, challenge, auth } = data as WindowMessage
                if (source !== 'byoi-extension') return
                if (type === 'signin-error') return reject('Failed to signin')
                if (type !== 'signin-response') return
                if (Date.now() - challenge!.timestamp > 5 * MINUTE) return reject('Failed to signin')
                window.removeEventListener('message', confirmation)
                const { trigger, signup, signin, publicKey } = auth!
                if (trigger === 'signup') {
                    resolve({
                        success: true, trigger,
                        user: signup!.user
                    })
                    localStorage.setItem(BYOI_SESSION_KEY, JSON.stringify(signup!.user))
                }
                else {
                    verifyPasskey({
                        clientDataJSON: uint8arrays.fromString(signin?.clientDataJSON, 'base64url'),
                        authenticatorData: uint8arrays.fromString(signin?.authenticatorData, 'base64url'),
                        signature: uint8arrays.fromString(signin?.signature, 'base64url'),
                        publicJwk: publicKey
                    }).then(verified => resolve({
                        success: verified, trigger,
                        user: verified ? signin!.user : null
                    }))
                    localStorage.setItem(BYOI_SESSION_KEY, JSON.stringify(signin!.user))
                }
            } catch (e) {
                reject(e)
            }
        }
        window.addEventListener('message', confirmation)
        const bytes = new Uint8Array(32)
        crypto.getRandomValues(bytes)
        const message: WindowMessage = {
            source: 'byoi-sdk',
            type: 'signin-request',
            challenge: {
                payload: uint8arrays.toString(bytes, 'base64url') as Base64Url,
                timestamp: Date.now()
            },
            persistingUser: user
        }
        window.postMessage(message, window.location.origin)
    })
}


export const verifyPasskey = async ({ clientDataJSON, authenticatorData, signature, publicJwk }: {
    clientDataJSON: Uint8Array
    authenticatorData: Uint8Array
    signature: Uint8Array
    publicJwk: JsonWebKey
}) => {
    const clientData = JSON.parse(new TextDecoder().decode(clientDataJSON))
    if (clientData.type !== 'webauthn.get') throw new Error('Failed to find proper client data')
    const clientDataHash = await crypto.subtle.digest('SHA-256', clientDataJSON)
    const signedData = uint8arrays.concat([authenticatorData, new Uint8Array(clientDataHash)])
    const publicKey = await crypto.subtle.importKey(
        'jwk',
        publicJwk,
        {
            name: 'ECDSA',
            namedCurve: 'P-256'
        },
        false,
        ['verify']
    )
    return await crypto.subtle.verify(
        {
            name: 'ECDSA',
            hash: { name: 'SHA-256' }
        },
        publicKey,
        decodeDER(signature),
        signedData
    )
}
