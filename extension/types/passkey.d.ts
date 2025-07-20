import { Base64Url } from './did'

export interface AuthChallenge {
    payload: Base64Url
    timestamp: number
}

export interface AttestationParams {
    challenge: AuthChallenge
    user: PublicKeyCredentialUserEntity
}

export interface AssertionParams {
    challenge: AuthChallenge
    credentialId: Uint8Array
}