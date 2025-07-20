export interface AuthChallenge {
    payload: Uint8Array
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