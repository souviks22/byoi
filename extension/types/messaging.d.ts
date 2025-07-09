import type { Did, DidDocument, DidKeys, DidPatch, DidUser } from './did'

export interface WindowMessage {
    challenge: {
        payload: Uint8Array
        timestamp: number
    },
    credentialId?: Uint8Array
}

export interface RuntimeParams {
    did?: Did
    keys?: DidKeys
    user?: DidUser
    document?: DidDocument
    patch?: DidPatch
}


export interface RuntimeMessage {
    source: 'popup' | 'options' | 'content'
    type: 'save-keys' | 'get-keys' | 'save-user' | 'get-user' | 'save-did' | 'get-did' | 'update-did'
    params: RuntimeParams
}

export interface RuntimeResponse {
    success: boolean,
    data?: any,
    error?: any
}