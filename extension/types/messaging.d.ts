import type { Did, DidPasskey, DidDocument, DidKeys, DidPatch, DidUser } from './did'
import type { Base64Url } from './did'

export interface WindowChallenge {
    payload: Base64Url
    timestamp: number
}

export interface WindowMessage {
    source: 'byoi-sdk' | 'byoi-extension'
    type: 'signin-request' | 'signin-response'
    challenge: WindowChallenge,
    auth?: {
        trigger: 'signup' | 'signin'
        publicKey: JsonWebKey
        signup?: {
            clientDataJSON: Base64Url
            attestationObject: Base64Url
        }
        signin?: {
            clientDataJSON: Base64Url
            authenticatorData: Base64Url
            signature: Base64Url
        }
    }
}

export interface RuntimeParams {
    did?: Did
    keys?: DidKeys
    user?: DidUser
    passkey?: DidPasskey
    document?: DidDocument
    patch?: DidPatch
}


export interface RuntimeMessage {
    source: 'popup' | 'options' | 'content'
    type: 'save-keys' | 'get-keys' | 'save-user' | 'get-user' | 'save-credential' | 'get-credential' | 'save-did' | 'get-did' | 'update-did'
    params: RuntimeParams
}

export interface RuntimeResponse {
    success: boolean
    data?: any
    error?: any
}