export interface AttestationParams {
    challenge: Uint8Array
    user: {
        id: Uint8Array
        name: string
        displayName: string
    }
}

export interface AssertionParams {
    challenge: Uint8Array
    credentialId: Uint8Array
}