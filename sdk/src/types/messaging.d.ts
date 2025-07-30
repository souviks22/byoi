import type { Base64Url, AuthChallenge, DidUser } from './passkey'

export interface WindowMessage {
    source: 'byoi-sdk' | 'byoi-extension'
    type: 'signin-request' | 'signin-response' | 'signin-error' | 'signin-ping' | 'signin-pong'
    challenge?: AuthChallenge
    auth?: {
        trigger: 'signup' | 'signin'
        publicKey: JsonWebKey
        signup?: {
            clientDataJSON: Base64Url
            attestationObject: Base64Url
            user: DidUser | null
        }
        signin?: {
            clientDataJSON: Base64Url
            authenticatorData: Base64Url
            signature: Base64Url
            user: DidUser | null
        }
    }
    persistingUser?: DidUser | null
}
